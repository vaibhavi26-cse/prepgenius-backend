import { logActivity } from "../utils/logActivity.js";
const SYSTEM_ROLE = (subject, difficulty) =>
  `
You are conducting a live, spoken mock interview for a student placement-prep platform.
Subject focus: ${subject}. Difficulty: ${difficulty}.

Behave like a real human interviewer having a spoken conversation:
- Ask one question at a time, conversationally, as if speaking aloud.
- After the candidate answers, decide whether to ask a natural follow-up on their answer, or move to a new question on the subject.
- Vary between conceptual questions, scenario-based questions, and (for DSA/Web Dev) verbal problem-solving questions.
- Keep your questions and follow-ups concise — 1-3 sentences, since this will be spoken aloud via text-to-speech.
- If the candidate's answer is vague or incomplete, probe deeper before moving on.
- After a reasonable number of exchanges (roughly 6-10 questions total) covering good ground, wrap up the interview naturally.

Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{
  "action": "continue" | "end",
  "message": "<your spoken question, follow-up, or closing remark>"
}
Use "end" only when you are wrapping up the interview with a closing remark (e.g. thanking them and saying the interview is complete).
`.trim();

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

async function callGemini(prompt) {
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
  temperature: 0.7,
  maxOutputTokens: 1500,
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

function historyToTranscript(history) {
  return history
    .map(
      (h) =>
        `${h.role === "assistant" ? "Interviewer" : "Candidate"}: ${h.content}`,
    )
    .join("\n");
}

// POST /api/interview/start   body: { subject, difficulty }
export const startInterview = async (req, res) => {
  try {
    const { subject, difficulty } = req.body;
    if (!subject || !difficulty) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Subject and difficulty are required.",
        });
    }

    const prompt = `
${SYSTEM_ROLE(subject, difficulty)}

This is the very start of the interview. Greet the candidate briefly (one sentence) and ask your first question.
`.trim();

   const cleaned = await callGemini(prompt);
    const parsed = JSON.parse(cleaned);
    res.status(200).json({ success: true, ...parsed });
  } catch (error) {
    console.error("startInterview error:", error);
    const isQuotaError =
      error.message?.includes("quota") ||
      error.message?.includes("RESOURCE_EXHAUSTED");

    if (isQuotaError) {
      return res.status(429).json({
        success: false,
        quotaExceeded: true,
        message: "Daily AI usage limit reached. Please try again later or tomorrow.",
      });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to start interview." });
  }
};

// POST /api/interview/turn   body: { subject, difficulty, history, userAnswer }
export const nextTurn = async (req, res) => {
  try {
    const { subject, difficulty, history = [], userAnswer } = req.body;
    if (!userAnswer || !userAnswer.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Answer is required." });
    }

    const transcript = historyToTranscript(history);

    const prompt = `
${SYSTEM_ROLE(subject, difficulty)}

CONVERSATION SO FAR:
${transcript}

Candidate: ${userAnswer}

Decide your next move: continue with a follow-up/new question, or end the interview if you've covered enough ground.
`.trim();

    const cleaned = await callGemini(prompt);
    const parsed = JSON.parse(cleaned);
    res.status(200).json({ success: true, ...parsed });
 } catch (error) {
    console.error("nextTurn error:", error);
    const isQuotaError =
      error.message?.includes("quota") ||
      error.message?.includes("RESOURCE_EXHAUSTED");

    if (isQuotaError) {
      return res.status(429).json({
        success: false,
        quotaExceeded: true,
        message: "Daily AI usage limit reached. Please try again later or tomorrow.",
      });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to get next question." });
  }
};

// POST /api/interview/analyze   body: { subject, difficulty, history }
export const analyzeInterview = async (req, res) => {
  try {
    const { subject, difficulty, history = [] } = req.body;
    const transcript = historyToTranscript(history);

    const prompt = `
You are evaluating a completed mock interview for a student placement-prep platform.
Subject: ${subject}. Difficulty: ${difficulty}.

FULL TRANSCRIPT:
${transcript}

Evaluate the candidate's performance based on clarity, technical accuracy, confidence, and communication.
Respond with ONLY valid JSON, no markdown fences, in exactly this shape:
{
  "confidenceScore": <integer 0-100>,
  "strengths": ["<2-3 specific strengths, referencing actual answers>"],
  "weaknesses": ["<2-3 specific weaknesses, referencing actual answers>"],
  "suggestions": ["<2-3 specific, actionable improvement suggestions>"]
}
Be honest and specific — base this on what the candidate actually said, not generic feedback.
`.trim();

    const cleaned = await callGemini(prompt);
    const parsed = JSON.parse(cleaned);
    await logActivity(req.user._id);
    res.status(200).json({ success: true, result: parsed });
 } catch (error) {
    console.error("analyzeInterview error:", error);
    const isQuotaError =
      error.message?.includes("quota") ||
      error.message?.includes("RESOURCE_EXHAUSTED");

    if (isQuotaError) {
      return res.status(429).json({
        success: false,
        quotaExceeded: true,
        message: "Daily AI usage limit reached. Please try again later or tomorrow.",
      });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to analyze interview." });
  }
};
