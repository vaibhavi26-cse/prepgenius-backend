import ChatMessage from "../models/ChatMessage.js";
import { logActivity } from "../utils/logActivity.js";

const SYSTEM_INSTRUCTION = `You are the PrepGenius AI Assistant, embedded inside a student placement-prep platform.
You help students with DSA concepts, interview prep, resume advice, aptitude questions, and study planning.
Match your response length to the question: for greetings or small talk, reply briefly and warmly in 1-2 sentences.
Only go in-depth with structured explanations, examples, or study plans when the question actually asks for one.
Keep answers clear and encouraging. Use short paragraphs or bullet points for explanations when depth is needed.
If asked something totally unrelated to studies/careers/placements, politely redirect back to how you can help with prep.Never use LaTeX or dollar-sign math notation (like $O(n)$). Write complexity and formulas in plain text instead, e.g. "O(n log n)" not "$O(n \\log n)$".`;
// GET /api/ai/messages
export const getChatHistory = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ user: req.user._id })
      .sort({ createdAt: 1 })
      .limit(200);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to load chat history." });
  }
};

// POST /api/ai/messages   body: { message }
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required." });
    }

    await ChatMessage.create({
      user: req.user._id,
      role: "user",
      content: message,
    });

    // Pull recent history for context (last 20 messages)
    const recent = await ChatMessage.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    recent.reverse();

    const contents = recent.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
        }),
      },
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Gemini API error:", data);
      return res.status(502).json({
        success: false,
        message: data?.error?.message || "AI provider error.",
      });
    }

    const replyText =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Sorry, I couldn't generate a response. Please try again.";

    const assistantMsg = await ChatMessage.create({
      user: req.user._id,
      role: "assistant",
      content: replyText,
    });
    await logActivity(req.user._id);
    res.status(200).json({ success: true, reply: assistantMsg });
  } catch (error) {
    console.error("sendMessage error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get a response." });
  }
};

// DELETE /api/ai/messages (optional: clear conversation)
export const clearChatHistory = async (req, res) => {
  try {
    await ChatMessage.deleteMany({ user: req.user._id });
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to clear history." });
  }
};
