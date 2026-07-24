import express from "express";
import protect from "../middleware/authMiddleware.js";
import { startInterview, nextTurn, analyzeInterview } from "../controllers/mockInterviewController.js";

const router = express.Router();

router.post("/start", protect, startInterview);
router.post("/turn", protect, nextTurn);
router.post("/analyze", protect, analyzeInterview);

export default router;