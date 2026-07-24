import UserProgress from "../models/UserProgress.js";
import { logActivity } from "../utils/logActivity.js";

// POST /api/progress/toggle — mark a note as read/unread (toggles)
export const toggleProgress = async (req, res) => {
  try {
    const { contentId } = req.body;
    const userId = req.user._id;

    const existing = await UserProgress.findOne({ user: userId, content: contentId });

    if (existing) {
      // Already marked read — remove it (toggle off)
      await UserProgress.deleteOne({ _id: existing._id });
      return res.status(200).json({ success: true, completed: false });
    } else {
      // Not marked yet — create it (toggle on)
      await UserProgress.create({ user: userId, content: contentId });
      await logActivity(userId);
      return res.status(200).json({ success: true, completed: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// GET /api/progress/:subject — get list of completed content IDs for this user, in one subject
export const getProgressForSubject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { subject } = req.params;

    // Find all progress records for this user, populated with the content's subject
    const records = await UserProgress.find({ user: userId }).populate({
      path: "content",
      match: { subject },
      select: "_id",
    });

    // Filter out nulls (populate returns null if the content didn't match the subject filter)
    const completedIds = records
      .filter((r) => r.content !== null)
      .map((r) => r.content._id.toString());

    res.status(200).json({ success: true, completedIds });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};