import express from "express";
import {
  getContentBySubject,
  submitQuizAttempt,
  submitMockTestAttempt,
  createContent,
  updateContent,
  deleteContent,
  getAllContentAdmin,
  getSubjectsSummary,
} from "../controllers/contentController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Student-facing routes
router.get("/summary", protect, getSubjectsSummary);
router.get("/:subject", protect, getContentBySubject);
router.post("/:contentId/submit", protect, submitQuizAttempt);
router.post("/:contentId/submit-mocktest", protect, submitMockTestAttempt);

// Admin-only routes
router.get("/admin/all", protect, adminOnly, getAllContentAdmin);
router.post("/", protect, adminOnly, createContent);
router.put("/:id", protect, adminOnly, updateContent);
router.delete("/:id", protect, adminOnly, deleteContent);

export default router;