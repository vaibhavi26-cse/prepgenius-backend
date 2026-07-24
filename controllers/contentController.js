import Content from "../models/Content.js";
import MockTestAttempt from "../models/MockTestAttempt.js";
import UserProgress from "../models/UserProgress.js";
import QuizAttempt from "../models/QuizAttempt.js";
import { notifyAllUsers } from "../utils/createNotification.js";
import Notification from "../models/Notification.js";
import { logActivity } from "../utils/logActivity.js";

// Maps database "type" values to the array-key names your frontend expects
const TYPE_TO_KEY = {
  note: "notes",
  pdf: "pdfs",
  resource: "resources",
  quiz: "quizzes",
  mcq: "mcqs",
  interviewQuestion: "interviewQuestions",
  mockTest: "mockTests",
};

// GET /api/content/:subject — fetch all content for one subject, grouped by type
export const getContentBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const userId = req.user._id;

    const allContent = await Content.find({ subject }).sort({
      order: 1,
      createdAt: 1,
    });

    const grouped = {
      notes: [],
      pdfs: [],
      resources: [],
      quizzes: [],
      mcqs: [],
      interviewQuestions: [],
      mockTests: [],
    };

    const quizMcqIds = allContent
      .filter((c) => c.type === "quiz" || c.type === "mcq")
      .map((c) => c._id);
    const userQuizAttempts = await QuizAttempt.find({
      user: userId,
      content: { $in: quizMcqIds },
    });
    const quizAttemptMap = {};
    userQuizAttempts.forEach((a) => {
      const key = a.content.toString();
      if (!quizAttemptMap[key])
        quizAttemptMap[key] = { attempts: 0, bestScore: 0 };
      quizAttemptMap[key].attempts += 1;
      quizAttemptMap[key].bestScore = Math.max(
        quizAttemptMap[key].bestScore,
        a.scorePercent,
      );
    });

    const mockTestIds = allContent
      .filter((c) => c.type === "mockTest")
      .map((c) => c._id);
    const userMockAttempts = await MockTestAttempt.find({
      user: userId,
      content: { $in: mockTestIds },
    });
    const mockAttemptMap = {};
    userMockAttempts.forEach((a) => {
      const key = a.content.toString();
      if (!mockAttemptMap[key])
        mockAttemptMap[key] = { attempts: 0, bestScore: 0 };
      mockAttemptMap[key].attempts += 1;
      const pct =
        a.totalMarks > 0 ? Math.round((a.scoredMarks / a.totalMarks) * 100) : 0;
      mockAttemptMap[key].bestScore = Math.max(
        mockAttemptMap[key].bestScore,
        pct,
      );
    });

    allContent.forEach((item) => {
      const key = TYPE_TO_KEY[item.type];
      if (!key) return;
      const obj = item.toObject();
      if (item.type === "quiz" || item.type === "mcq") {
        const info = quizAttemptMap[item._id.toString()];
        obj.userAttempts = info?.attempts || 0;
        obj.userBestScore = info?.bestScore ?? null;
      }
      if (item.type === "mockTest") {
        const info = mockAttemptMap[item._id.toString()];
        obj.userAttempts = info?.attempts || 0;
        obj.userBestScore = info?.bestScore ?? null;
      }
      grouped[key].push(obj);
    });

    res.status(200).json({ success: true, content: grouped });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// POST /api/content/:contentId/submit — grade a quiz/MCQ attempt
export const submitQuizAttempt = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { answers } = req.body;

    const content = await Content.findById(contentId);
    if (!content) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found." });
    }

    if (
      !Array.isArray(answers) ||
      answers.length !== content.questionBank.length
    ) {
      return res.status(400).json({
        success: false,
        message: `Expected ${content.questionBank.length} answers.`,
      });
    }

    let correctCount = 0;
    const results = content.questionBank.map((q, i) => {
      const isCorrect = answers[i] === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      return {
        questionText: q.questionText,
        selectedIndex: answers[i],
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
      };
    });

    const scorePercent = Math.round(
      (correctCount / content.questionBank.length) * 100,
    );

    await QuizAttempt.create({
      user: req.user._id,
      content: contentId,
      scorePercent,
      correctCount,
      totalQuestions: content.questionBank.length,
    });

    await logActivity(req.user._id);

    const userAttempts = await QuizAttempt.find({ user: req.user._id, content: contentId });
    const userBestScore = Math.max(...userAttempts.map((a) => a.scorePercent));

    res.status(200).json({
      success: true,
      scorePercent,
      correctCount,
      totalQuestions: content.questionBank.length,
      bestScore: userBestScore,
      attemptsCount: userAttempts.length,
      results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// POST /api/content/:contentId/submit-mocktest — grade a mock test with negative marking
export const submitMockTestAttempt = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { answers, timeTakenSeconds, violationCount, autoSubmitted } =
      req.body;
    // answers = array of { questionIndex, selectedIndex, status }

    const content = await Content.findById(contentId);
    if (!content) {
      return res
        .status(404)
        .json({ success: false, message: "Mock test not found." });
    }

    const totalQuestions = content.questionBank.length;
    const positiveMarks = content.positiveMarks ?? 1;
    const negativeMarks = content.negativeMarks ?? 0.33;

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    let scoredMarks = 0;

    const detailedResults = content.questionBank.map((q, i) => {
      const userAnswer = answers.find((a) => a.questionIndex === i);
      const selectedIndex = userAnswer ? userAnswer.selectedIndex : null;

      if (selectedIndex === null || selectedIndex === undefined) {
        unattemptedCount++;
        return {
          questionText: q.questionText,
          selectedIndex: null,
          correctAnswerIndex: q.correctAnswerIndex,
          isCorrect: false,
          isAttempted: false,
          marksAwarded: 0,
        };
      }

      const isCorrect = selectedIndex === q.correctAnswerIndex;
      if (isCorrect) {
        correctCount++;
        scoredMarks += positiveMarks;
      } else {
        wrongCount++;
        scoredMarks -= negativeMarks;
      }

      return {
        questionText: q.questionText,
        selectedIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        isAttempted: true,
        marksAwarded: isCorrect ? positiveMarks : -negativeMarks,
      };
    });

    const totalMarks = totalQuestions * positiveMarks;
    scoredMarks = Math.round(scoredMarks * 100) / 100; // round to 2 decimals

    const attemptedCount = correctCount + wrongCount;
    const accuracy =
      attemptedCount > 0
        ? Math.round((correctCount / attemptedCount) * 100)
        : 0;

    const attempt = await MockTestAttempt.create({
      user: req.user._id,
      content: contentId,
      answers,
      totalMarks,
      scoredMarks,
      correctCount,
      wrongCount,
      unattemptedCount,
      accuracy,
      timeTakenSeconds,
      violationCount: violationCount || 0,
      autoSubmitted: !!autoSubmitted,
    });

    // Update the content's attempt counter
    content.attempts = (content.attempts || 0) + 1;
    await content.save();
   await logActivity(req.user._id);
    res.status(200).json({
      success: true,
      attemptId: attempt._id,
      totalMarks,
      scoredMarks,
      correctCount,
      wrongCount,
      unattemptedCount,
      accuracy,
      timeTakenSeconds,
      violationCount: violationCount || 0,
      autoSubmitted: !!autoSubmitted,
      results: detailedResults,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// POST /api/content — create new content (admin only)
export const createContent = async (req, res) => {
  try {
    const newContent = await Content.create(req.body);
    console.log("✅ Content created:", newContent._id, newContent.type);

    notifyAllUsers({
      type: "new_content",
      message: `New ${newContent.type} added: ${newContent.title || newContent.subject}`,
      link: "/learning",
      contentId: newContent._id,
    });
    console.log("📨 notifyAllUsers call fired");

    res.status(201).json({ success: true, content: newContent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// PUT /api/content/:id — update existing content (admin only)
export const updateContent = async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found." });
    }
    res.status(200).json({ success: true, content: updated });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// DELETE /api/content/:id — delete content (admin only)
export const deleteContent = async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found." });
    }

    await Notification.deleteMany({ content: deleted._id });

    res.status(200).json({ success: true, message: "Content deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// GET /api/content/admin/all — fetch ALL content across all subjects (admin only, for the admin list view)
export const getAllContentAdmin = async (req, res) => {
  try {
    const { subject, type } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (type) filter.type = type;

    const content = await Content.find(filter).sort({
      subject: 1,
      type: 1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, content });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// GET /api/content/summary — real counts + progress % for every subject, for the Learning Hub grid
export const getSubjectsSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const moduleAgg = await Content.aggregate([
      { $match: { type: "note", module: { $nin: [null, ""] } } },
      { $group: { _id: { subject: "$subject", module: "$module" } } },
      { $group: { _id: "$_id.subject", moduleCount: { $sum: 1 } } },
    ]);

    const quizAgg = await Content.aggregate([
      { $match: { type: "quiz" } },
      { $group: { _id: "$subject", quizCount: { $sum: 1 } } },
    ]);

    const mcqAgg = await Content.aggregate([
      { $match: { type: "mcq" } },
      { $group: { _id: "$subject", mcqCount: { $sum: 1 } } },
    ]);

    const testAgg = await Content.aggregate([
      { $match: { type: "mockTest" } },
      { $group: { _id: "$subject", testCount: { $sum: 1 } } },
    ]);

    const notesAgg = await Content.aggregate([
      { $match: { type: "note" } },
      { $group: { _id: "$subject", totalNotes: { $sum: 1 } } },
    ]);

    const progressRecords = await UserProgress.find({ user: userId }).populate({
      path: "content",
      match: { type: "note" },
      select: "subject",
    });
    const completedNotesMap = {};
    progressRecords.forEach((r) => {
      if (r.content) {
        completedNotesMap[r.content.subject] =
          (completedNotesMap[r.content.subject] || 0) + 1;
      }
    });

    const quizAttempts = await QuizAttempt.find({ user: userId }).populate({
      path: "content",
      select: "subject",
    });
    const attemptedQuizIdsMap = {};
    quizAttempts.forEach((a) => {
      if (!a.content) return;
      const subj = a.content.subject;
      if (!attemptedQuizIdsMap[subj]) attemptedQuizIdsMap[subj] = new Set();
      attemptedQuizIdsMap[subj].add(a.content._id.toString());
    });

    const mockAttempts = await MockTestAttempt.find({ user: userId }).populate({
      path: "content",
      select: "subject",
    });
    const attemptedTestIdsMap = {};
    mockAttempts.forEach((a) => {
      if (!a.content) return;
      const subj = a.content.subject;
      if (!attemptedTestIdsMap[subj]) attemptedTestIdsMap[subj] = new Set();
      attemptedTestIdsMap[subj].add(a.content._id.toString());
    });

    const map = {};
    const ensure = (subject) => {
      if (!map[subject]) {
        map[subject] = {
          subject,
          moduleCount: 0,
          quizCount: 0,
          mcqCount: 0,
          testCount: 0,
          totalNotes: 0,
          progressPercent: 0,
        };
      }
      return map[subject];
    };

    moduleAgg.forEach((m) => {
      ensure(m._id).moduleCount = m.moduleCount;
    });
    quizAgg.forEach((q) => {
      ensure(q._id).quizCount = q.quizCount;
    });
    mcqAgg.forEach((m) => {
      ensure(m._id).mcqCount = m.mcqCount;
    });
    testAgg.forEach((t) => {
      ensure(t._id).testCount = t.testCount;
    });
    notesAgg.forEach((n) => {
      ensure(n._id).totalNotes = n.totalNotes;
    });

    Object.keys(map).forEach((subject) => {
      const s = map[subject];
      const totalItems = s.totalNotes + s.quizCount + s.mcqCount + s.testCount;
      const completedNotes = completedNotesMap[subject] || 0;
      const attemptedQuizCount = attemptedQuizIdsMap[subject]?.size || 0;
      const attemptedTestCount = attemptedTestIdsMap[subject]?.size || 0;
      const completedItems =
        completedNotes + attemptedQuizCount + attemptedTestCount;
      s.progressPercent =
        totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    });

    res.status(200).json({ success: true, summary: Object.values(map) });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
