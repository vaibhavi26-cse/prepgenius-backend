import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  generateStudyPlan,
  getMyStudyPlan,
  toggleWeekComplete,
} from "../controllers/studyPlanController.js";

const router = express.Router();

router.post("/generate", protect, generateStudyPlan);
router.get("/me", protect, getMyStudyPlan);
router.post("/toggle", protect, toggleWeekComplete);

export default router;