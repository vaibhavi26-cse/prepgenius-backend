import InterviewStory from "../models/InterviewStory.js";

// GET /api/placement/interview-stories
export const getInterviewStories = async (req, res) => {
  try {
    const stories = await InterviewStory.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, stories, userId: req.user._id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load stories." });
  }
};

// POST /api/placement/interview-stories
export const createInterviewStory = async (req, res) => {
  try {
    const { company, role, difficulty, story } = req.body;
    if (!company || !role || !story) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }
    const created = await InterviewStory.create({
      user: req.user._id,
      name: req.user.name,
      college: req.user.college || "",
      company,
      role,
      difficulty: difficulty || "Medium",
      story,
    });
    res.status(201).json({ success: true, story: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to submit story." });
  }
};

// POST /api/placement/interview-stories/:id/helpful
export const toggleHelpful = async (req, res) => {
  try {
    const story = await InterviewStory.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: "Not found." });

    const uid = req.user._id.toString();
    const alreadyVoted = story.helpfulBy.some((u) => u.toString() === uid);

    if (alreadyVoted) {
      story.helpfulBy = story.helpfulBy.filter((u) => u.toString() !== uid);
      story.helpfulCount = Math.max(0, story.helpfulCount - 1);
    } else {
      story.helpfulBy.push(req.user._id);
      story.helpfulCount += 1;
    }
    await story.save();
    res.status(200).json({ success: true, helpfulCount: story.helpfulCount, voted: !alreadyVoted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update." });
  }
};