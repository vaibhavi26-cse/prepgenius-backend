import mongoose from "mongoose";

const ChallengeProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "solved"],
      default: "not-started",
    },
    solvedAt: { type: Date },
  },
  { timestamps: true }
);

ChallengeProgressSchema.index({ user: 1, content: 1 }, { unique: true });

export default mongoose.model("ChallengeProgress", ChallengeProgressSchema);