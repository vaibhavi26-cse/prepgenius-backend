import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
  week: { type: String, required: true },
  topic: { type: String, required: true },
  focus: { type: String, default: "" },
  completed: { type: Boolean, default: false },
});

const studyPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    goal: { type: String, required: true },
    hoursPerDay: { type: Number, required: true },
    duration: { type: String, required: true },
    weeks: [weekSchema],
  },
  { timestamps: true }
);

export default mongoose.model("StudyPlan", studyPlanSchema);