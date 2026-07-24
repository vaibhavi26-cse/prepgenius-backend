import Content from "../models/Content.js";
import DSAProgress from "../models/DSAProgress.js";
import ChallengeProgress from "../models/ChallengeProgress.js";
import User from "../models/User.js";
import { logActivity } from "../utils/logActivity.js";
// GET /api/placement/dsa-tracker
// Returns all DSA tracker problems grouped by topic (module), each annotated
// with this user's status, plus overall + per-topic stats.
export const getDSATracker = async (req, res) => {
  try {
    const problems = await Content.find({ subject: "dsa", type: "dsaProblem" })
      .sort({ moduleOrder: 1, title: 1 })
      .lean();

    const progressDocs = await DSAProgress.find({ user: req.user._id }).lean();
    const statusMap = {};
    progressDocs.forEach((p) => {
      statusMap[p.content.toString()] = p.status;
    });

    // Group by module/topic
    const topicsMap = {};
    problems.forEach((problem) => {
      const status = statusMap[problem._id.toString()] || "not-started";
      const enriched = { ...problem, status };

      if (!topicsMap[problem.module]) {
        topicsMap[problem.module] = {
          module: problem.module,
          moduleOrder: problem.moduleOrder ?? 0,
          problems: [],
        };
      }
      topicsMap[problem.module].problems.push(enriched);
    });

    const topics = Object.values(topicsMap).sort(
      (a, b) => a.moduleOrder - b.moduleOrder
    );

    // Per-topic + overall stats
    let totalSolved = 0;
    const difficultyBreakdown = { Easy: 0, Medium: 0, Hard: 0 };

    topics.forEach((topic) => {
      const solvedInTopic = topic.problems.filter(
        (p) => p.status === "solved"
      ).length;
      topic.total = topic.problems.length;
      topic.solved = solvedInTopic;
      topic.progressPercent = topic.total
        ? Math.round((solvedInTopic / topic.total) * 100)
        : 0;

      topic.problems.forEach((p) => {
        if (p.status === "solved") {
          totalSolved += 1;
          if (difficultyBreakdown[p.difficulty] !== undefined) {
            difficultyBreakdown[p.difficulty] += 1;
          }
        }
      });
    });

    const totalProblems = problems.length;

    res.json({
      topics,
      stats: {
        totalProblems,
        totalSolved,
        progressPercent: totalProblems
          ? Math.round((totalSolved / totalProblems) * 100)
          : 0,
        difficultyBreakdown,
      },
    });
  } catch (err) {
    console.error("getDSATracker error:", err);
    res.status(500).json({ message: "Failed to load DSA tracker" });
  }
};

// POST /api/placement/dsa-tracker/status
// body: { contentId, status }
export const updateDSAStatus = async (req, res) => {
  try {
    const { contentId, status } = req.body;
    const validStatuses = ["not-started", "attempted", "solved", "revise-later"];

    if (!contentId || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid contentId or status" });
    }

    const problem = await Content.findOne({
      _id: contentId,
      type: "dsaProblem",
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

   const updated = await DSAProgress.findOneAndUpdate(
      { user: req.user._id, content: contentId },
      { status },
      { upsert: true, new: true }
    );

    if (status === "solved") {
      await logActivity(req.user._id);
    }

    res.json({ contentId, status: updated.status });
  } catch (err) {
    console.error("updateDSAStatus error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};
// GET /api/placement/resume-templates
export const getResumeTemplates = async (req, res) => {
  try {
    const templates = await Content.find({ subject: "placement", type: "resumeTemplate" })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error("getResumeTemplates error:", error);
    res.status(500).json({ success: false, message: "Failed to load resume templates." });
  }
};
// GET /api/placement/companies
export const getCompanyList = async (req, res) => {
  try {
    const companies = await Content.distinct("module", {
      subject: "placement",
      type: "companyQuestion",
    });
    res.status(200).json({ success: true, companies: companies.filter(Boolean).sort() });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load companies." });
  }
};

// GET /api/placement/company-questions?company=Amazon
export const getCompanyQuestionFiles = async (req, res) => {
  try {
    const { company } = req.query;
    if (!company) {
      return res.status(400).json({ success: false, message: "Company is required." });
    }
    const files = await Content.find({
      subject: "placement",
      type: "companyQuestion",
      module: new RegExp(`^${company}$`, "i"),
    }).sort({ subtopic: 1, createdAt: 1 });

    const grouped = { OA: [], Technical: [], HR: [] };
    files.forEach((f) => grouped[f.subtopic]?.push(f));

    res.status(200).json({ success: true, company, grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load questions." });
  }
};
// GET /api/placement/challenges
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Content.find({ type: "codingChallenge" })
      .sort({ createdAt: -1 })
      .lean();

    const progressDocs = await ChallengeProgress.find({ user: req.user._id }).lean();
    const statusMap = {};
    const solvedDates = [];
    progressDocs.forEach((p) => {
      statusMap[p.content.toString()] = p.status;
      if (p.status === "solved" && p.solvedAt) solvedDates.push(p.solvedAt);
    });

    const enriched = challenges.map((c) => ({
      ...c,
      status: statusMap[c._id.toString()] || "not-started",
    }));

    // Streak: consecutive days (including today) with at least one solve
    const daySet = new Set(
      solvedDates.map((d) => new Date(d).toISOString().slice(0, 10))
    );
    let streak = 0;
    let cursor = new Date();
    while (daySet.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    res.status(200).json({ success: true, challenges: enriched, streak });
  } catch (error) {
    console.error("getChallenges error:", error);
    res.status(500).json({ success: false, message: "Failed to load challenges." });
  }
};

// POST /api/placement/challenges/status
// body: { contentId, status }
export const updateChallengeStatus = async (req, res) => {
  try {
    const { contentId, status } = req.body;
    const validStatuses = ["not-started", "in-progress", "solved"];
    if (!contentId || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid contentId or status" });
    }

    const challenge = await Content.findOne({ _id: contentId, type: "codingChallenge" });
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    const existing = await ChallengeProgress.findOne({ user: req.user._id, content: contentId });
    const wasAlreadySolved = existing?.status === "solved";

    const updated = await ChallengeProgress.findOneAndUpdate(
      { user: req.user._id, content: contentId },
      { status, solvedAt: status === "solved" ? new Date() : existing?.solvedAt },
      { upsert: true, new: true }
    );

    // Award points only the first time it's marked solved
    if (status === "solved" && !wasAlreadySolved) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { points: challenge.points || 20 },
      });
      await logActivity(req.user._id);
    }
    

    res.status(200).json({ success: true, status: updated.status });
  } catch (error) {
    console.error("updateChallengeStatus error:", error);
    res.status(500).json({ success: false, message: "Failed to update status." });
  }
};