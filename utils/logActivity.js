import ActivityLog from "../models/ActivityLog.js";
import Notification from "../models/Notification.js";
import { notifyUser } from "./createNotification.js";

const MILESTONES = [7, 14, 30, 50, 100];

async function getCurrentStreak(userId) {
  const logs = await ActivityLog.find({ user: userId, count: { $gt: 0 } })
    .select("date")
    .lean();
  const dateSet = new Set(logs.map((l) => l.date));
  let streak = 0;
  const cursor = new Date();
  while (dateSet.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export const logActivity = async (userId) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    await ActivityLog.findOneAndUpdate(
      { user: userId, date: today },
      { $inc: { count: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const streak = await getCurrentStreak(userId);
    if (MILESTONES.includes(streak)) {
      const message = `You've hit a ${streak}-day streak! 🔥`;
      const already = await Notification.findOne({ user: userId, type: "streak_milestone", message });
      if (!already) {
        await notifyUser(userId, { type: "streak_milestone", message, link: "/profile" });
      }
    }
  } catch (err) {
    console.error("logActivity error:", err);
  }
};