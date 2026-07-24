import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const notifyUser = async (userId, { type, message, link = "" }) => {
  try {
    await Notification.create({ user: userId, type, message, link });
  } catch (err) {
    console.error("notifyUser error:", err);
  }
};
export const notifyAllUsers = async ({ type, message, link, contentId = null }) => {
  try {
    const users = await User.find({}).select("_id");
    console.log(`👥 Found ${users.length} users to notify`);
    if (!users.length) return;
    const docs = users.map((u) => ({ user: u._id, type, message, link, content: contentId }));
    const result = await Notification.insertMany(docs);
    console.log(`✅ Inserted ${result.length} notifications`);
  } catch (err) {
    console.error("notifyAllUsers error:", err);
  }
};