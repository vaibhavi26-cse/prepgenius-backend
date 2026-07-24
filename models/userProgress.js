import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    completed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate entries for the same user+content pair
UserProgressSchema.index({ user: 1, content: 1 }, { unique: true });

const UserProgress = mongoose.model("UserProgress", UserProgressSchema);

export default UserProgress;