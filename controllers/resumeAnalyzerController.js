import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { logActivity } from "../utils/logActivity.js";

const SECTION_KEYWORDS = [
  "experience",
  "education",
  "projects",
  "skills",
  "certifications",
];

// crude but useful signal: lines with a number + a metric-ish word nearby
const QUANT_PATTERN = /(\d+(\.\d+)?%|\$\d+|\b\d{2,}\b)/;
const METRIC_CONTEXT =
  /(increased|reduced|improved|optimized|decreased|grew|saved|boosted|cut|scaled|accelerated)/i;

function extractSections(text) {
  const lower = text.toLowerCase();
  return SECTION_KEYWORDS.filter((kw) => lower.includes(kw));
}

function countQuantifiedLines(text) {
  return text
    .split("\n")
    .filter((line) => QUANT_PATTERN.test(line) && METRIC_CONTEXT.test(line))
    .length;
}

function hasContactInfo(text) {
  const emailFound = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(
    text,
  );
  const phoneFound = /(\+?\d{1,3}[-.\s]?)?\d{10}/.test(text);
  return { emailFound, phoneFound };
}

async function extractText(file) {
  if (file.mimetype === "application/pdf") {
    const parser = new PDFParse({ data: file.buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }
  // docx
  const result = await mammoth.extractRawText({ buffer: file.buffer });
  return result.value;
}

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No resume file uploaded." });
    }

    const jobDescription = (req.body.jobDescription || "").trim();
    if (!jobDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Job description is required." });
    }

    const resumeText = await extractText(req.file);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(422).json({
        success: false,
        message:
          "Couldn't extract readable text from this file. Try a text-based PDF (not a scanned image).",
      });
    }

    // Deterministic signals — these ground the AI's scoring instead of letting it guess blind
    const sectionsFound = extractSections(resumeText);
    const quantifiedLines = countQuantifiedLines(resumeText);
    const wordCount = resumeText.trim().split(/\s+/).length;
    const { emailFound, phoneFound } = hasContactInfo(resumeText);

    const factsSummary = `
Computed facts about this resume (use these, don't re-derive from scratch):
- Word count: ${wordCount}
- Sections detected: ${sectionsFound.length ? sectionsFound.join(", ") : "none clearly detected"}
- Lines with quantifiable achievements (numbers + impact words): ${quantifiedLines}
- Email present: ${emailFound}
- Phone number present: ${phoneFound}
`;

    const prompt = `
You are an ATS (Applicant Tracking System) resume analyzer for a student placement-prep platform.

RESUME TEXT:
"""
${resumeText.slice(0, 6000)}
"""

TARGET JOB DESCRIPTION:
"""
${jobDescription.slice(0, 3000)}
"""

${factsSummary}

Analyze how well this resume matches the job description and general ATS/resume best practices.
Respond with ONLY valid JSON, no markdown fences, no commentary, in exactly this shape:

{
  "atsScore": <integer 0-100>,
  "skills": "<one of: Excellent, Good, Fair, Poor>",
  "format": "<one of: Excellent, Good, Fair, Poor>",
  "keywords": "<one of: Match, Fair, Poor>",
 "suggestions": ["<3-5 specific, actionable suggestions, each under 25 words>"],
  "keywordGaps": ["<important keywords/skills from the job description missing in the resume, max 8>"]
}

Base "keywords" and "keywordGaps" on comparing the resume against the specific job description above — not generic keywords.
Be honest and specific — reference actual content from the resume in suggestions where possible.
`.trim();

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 2500 },
        }),
      },
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Gemini API error:", data);
      const rawMessage = data?.error?.message || "";
      const isQuotaError =
        rawMessage.includes("quota") ||
        rawMessage.includes("RESOURCE_EXHAUSTED");
      if (isQuotaError) {
        return res.status(429).json({
          success: false,
          quotaExceeded: true,
          message:
            "Daily AI usage limit reached. Please try again later or tomorrow.",
        });
      }
      return res
        .status(502)
        .json({
          success: false,
          message: "AI analysis failed. Please try again.",
        });
    }

    const rawText =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON:", rawText);
      return res
        .status(502)
        .json({
          success: false,
          message: "AI returned an unexpected format. Try again.",
        });
    }
    await logActivity(req.user._id);
    res.status(200).json({ success: true, result: parsed });
  } catch (error) {
    console.error("analyzeResume error:", error);
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
      .json({ success: false, message: "Failed to analyze resume." });
  }
};
