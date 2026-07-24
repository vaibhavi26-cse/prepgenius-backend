import mongoose from "mongoose";

const MockTestAttemptSchema = new mongoose.Schema(
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
    answers: [
      {
        questionIndex: Number,
        selectedIndex: { type: Number, default: null }, // null = not attempted
        status: {
          type: String,
          enum: ["not-visited", "not-answered", "answered", "marked-for-review", "answered-marked"],
          default: "not-visited",
        },
      },
    ],
    totalMarks: { type: Number, required: true },
    scoredMarks: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    wrongCount: { type: Number, required: true },
    unattemptedCount: { type: Number, required: true },
    accuracy: { type: Number, required: true }, // % of attempted questions that were correct
    timeTakenSeconds: { type: Number, required: true },
    violationCount: { type: Number, default: 0 },
    autoSubmitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MockTestAttempt = mongoose.model("MockTestAttempt", MockTestAttemptSchema);

export default MockTestAttempt;