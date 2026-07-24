import DashboardGoal from "../models/DashboardGoal.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await DashboardGoal.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, goals });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load goals." });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Goal text is required." });
    }
    const goal = await DashboardGoal.create({ user: req.user._id, text: text.trim() });
    res.status(201).json({ success: true, goal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create goal." });
  }
};

export const toggleGoal = async (req, res) => {
  try {
    const goal = await DashboardGoal.findOne({ _id: req.params.id, user: req.user._id });
    if (!goal) {
      return res.status(404).json({ success: false, message: "Goal not found." });
    }
    goal.completed = !goal.completed;
    await goal.save();
    res.status(200).json({ success: true, goal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update goal." });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    await DashboardGoal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete goal." });
  }
};