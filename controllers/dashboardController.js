import Content from "../models/Content.js";
import UserProgress from "../models/UserProgress.js";
import QuizAttempt from "../models/QuizAttempt.js";
import MockTestAttempt from "../models/MockTestAttempt.js";

export const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalNotes = await Content.countDocuments({ type: "note" });
    const totalQuizzes = await Content.countDocuments({ type: "quiz" });
    const totalMcqs = await Content.countDocuments({ type: "mcq" });
    const totalTests = await Content.countDocuments({ type: "mockTest" });
    const totalItems = totalNotes + totalQuizzes + totalMcqs + totalTests;

    const completedNotes = await UserProgress.countDocuments({ user: userId });
    const attemptedQuizIds = await QuizAttempt.distinct("content", { user: userId });
    const attemptedTestIds = await MockTestAttempt.distinct("content", { user: userId });

    const completedItems = completedNotes + attemptedQuizIds.length + attemptedTestIds.length;
    const overallProgressPercent =
      totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const lastProgress = await UserProgress.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "content", select: "subject module title" });

    let resume = null;
    if (lastProgress?.content) {
      resume = {
        subject: lastProgress.content.subject,
        module: lastProgress.content.module || null,
        title: lastProgress.content.title || null,
      };
    }

    res.status(200).json({ success: true, overallProgressPercent, resume });
  } catch (error) {
    console.error("getDashboardOverview error:", error);
    res.status(500).json({ success: false, message: "Failed to load dashboard overview." });
  }
};