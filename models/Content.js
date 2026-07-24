import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      enum: [
        "dsa",
        "oops",
        "dbms",
        "os",
        "cn",
        "aptitude",
        "interview",
        "webdev",
        "placement",
      ],
    },
    type: {
      type: String,
      required: true,
      enum: [
        "note",
        "pdf",
        "resource",
        "quiz",
        "mcq",
        "interviewQuestion",
        "mockTest",
        "dsaProblem",
        "resumeTemplate",
        "companyQuestion",
        "codingChallenge",
      ],
    },

    // Common fields (used by multiple types)
    title: { type: String },
    url: { type: String },
    previewUrl: { type: String }, // Resume Templates: preview image
    // Notes / PDFs — module & subtopic grouping
    points: { type: Number, default: 20 }, // Coding Challenges: points awarded on solve
    size: { type: String },
    pages: { type: Number },
    body: { type: String, default: "" }, // actual reading content (add later)
    module: { type: String }, // e.g. "Module 1: Arrays"
    moduleOrder: { type: Number, default: 0 },
    subtopic: { type: String }, // e.g. "Array Basics"
    subtopicOrder: { type: Number, default: 0 },

    // Resources
    source: { type: String },

    // Quizzes / MCQs
    time: { type: String },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
    bestScore: { type: Number },
    attemptsCount: { type: Number, default: 0 },
    questionBank: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswerIndex: { type: Number, required: true },
      },
    ],

    // Mock Tests
    duration: { type: Number }, // in minutes
    attempts: { type: Number },
    positiveMarks: { type: Number, default: 1 },
    negativeMarks: { type: Number, default: 0.33 },

    // Interview Questions
    question: { type: String },
    answer: { type: String },

    // Sorting
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Content = mongoose.model("Content", ContentSchema);

export default Content;
