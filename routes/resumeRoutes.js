import express from "express";
import protect from "../middleware/authMiddleware.js";
import resumeUpload from "../middleware/resumeUpload.js";
import { analyzeResume } from "../controllers/resumeAnalyzerController.js";

const router = express.Router();

router.post("/analyze", protect, resumeUpload.single("resume"), analyzeResume);

export default router;