import mongoose from "mongoose";

const dsaProgressSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["not-started", "attempted", "solved", "revise-later"],
      default: "not-started",
    },
  },
  { timestamps: true }
);

// One status per user per problem
dsaProgressSchema.index({ user: 1, content: 1 }, { unique: true });

const DSAProgress = mongoose.model("DSAProgress", dsaProgressSchema);

export default DSAProgress;