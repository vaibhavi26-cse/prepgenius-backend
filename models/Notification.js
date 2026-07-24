import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["new_content", "streak_milestone", "general"],
      default: "general",
    },
    message: { type: String, required: true },
    link: { type: String, default: "" },
    read: { type: Boolean, default: false },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
