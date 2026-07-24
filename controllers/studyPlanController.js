import StudyPlan from "../models/StudyPlan.js";
import { logActivity } from "../utils/logActivity.js";

function extractJSON(rawText) {
  const start = rawText.indexOf("{");
  const end = rawText.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    console.error(
      "RAW GEMINI RESPONSE (no JSON found):",
      JSON.stringify(rawText),
    );
    throw new Error("No JSON object found in AI response.");
  }
  return rawText.slice(start, end + 1);
}

async function callGemini(prompt, maxTokens = 2000) {
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens,
          responseMimeType: "application/json",
        },
      }),
    },
  );
  const data = await geminiRes.json();
  if (!geminiRes.ok) {
    console.error("Gemini API error:", data);
    throw new Error(data?.error?.message || "AI request failed.");
  }
  if (!data?.candidates?.length) {
    console.error("Gemini returned no candidates:", JSON.stringify(data));
  }
  const rawText =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
  return extractJSON(rawText);
}

function weeksForDuration(duration) {
  const map = { "1 Month": 4, "3 Months": 12, "6 Months": 24 };
  return map[duration] || 8;
}

// POST /api/study-plan/generate   body: { goal, hoursPerDay, duration }
export const generateStudyPlan = async (req, res) => {
  try {
    const { goal, hoursPerDay, duration } = req.body;
    if (!goal || !hoursPerDay || !duration) {
      return res.status(400).json({
        success: false,
        message: "Goal, hoursPerDay, and duration are required.",
      });
    }

    const totalWeeks = weeksForDuration(duration);

    const prompt = `
You are an expert study-plan coach for a student placement-prep platform.

Create a personalized week-by-week study plan for:
- Goal: ${goal}
- Available time: ${hoursPerDay} hours/day
- Total duration: ${duration} (${totalWeeks} weeks)

Design a realistic, progressively structured plan that builds from fundamentals
to advanced/interview-ready topics, matching the given time commitment (more
hours/day should mean deeper coverage per week, not just more topics crammed in).

Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{
  "weeks": [
    { "week": "Week 1", "topic": "<short topic title>", "focus": "<one sentence on what to focus on this week>" }
  ]
}
Include exactly ${totalWeeks} week entries.
`.trim();

    const maxTokens = Math.min(8000, 800 + totalWeeks * 150);
    const cleaned = await callGemini(prompt, maxTokens);
    const parsed = JSON.parse(cleaned);

    const weeks = (parsed.weeks || []).map((w) => ({
      week: w.week,
      topic: w.topic,
      focus: w.focus || "",
      completed: false,
    }));

    const plan = await StudyPlan.findOneAndUpdate(
      { user: req.user._id },
      { user: req.user._id, goal, hoursPerDay, duration, weeks },
      { upsert: true, new: true },
    );
    await logActivity(req.user._id);
    res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("generateStudyPlan error:", error);
    const isQuotaError =
      error.message?.includes("quota") ||
      error.message?.includes("RESOURCE_EXHAUSTED");

    if (isQuotaError) {
      return res.status(429).json({
        success: false,
        quotaExceeded: true,
        message:
          "Daily AI usage limit reached. Please try again later or tomorrow.",
      });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to generate study plan." });
  }
};

// GET /api/study-plan/me
export const getMyStudyPlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findOne({ user: req.user._id });
    res.status(200).json({ success: true, plan: plan || null });
  } catch (error) {
    console.error("getMyStudyPlan error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to load study plan." });
  }
};

// POST /api/study-plan/toggle   body: { weekId }
export const toggleWeekComplete = async (req, res) => {
  try {
    const { weekId } = req.body;
    if (!weekId) {
      return res
        .status(400)
        .json({ success: false, message: "weekId is required." });
    }

    const plan = await StudyPlan.findOne({ user: req.user._id });
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "No study plan found." });
    }

    const week = plan.weeks.id(weekId);
    if (!week) {
      return res
        .status(404)
        .json({ success: false, message: "Week not found." });
    }
    week.completed = !week.completed;
    await plan.save();
    if (week.completed) {
      await logActivity(req.user._id);
    }

    res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("toggleWeekComplete error:", error);
    res.status(500).json({ success: false, message: "Failed to update week." });
  }
};
