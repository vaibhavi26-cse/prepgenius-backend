import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getHeatmap, getActivityYears, getStreak } from "../controllers/activityController.js";

const router = express.Router();

router.get("/heatmap", protect, getHeatmap);
router.get("/years", protect, getActivityYears);
router.get("/streak", protect, getStreak);

export default router;