import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getGoals, createGoal, toggleGoal, deleteGoal } from "../controllers/dashboardGoalController.js";

const router = express.Router();

router.get("/", protect, getGoals);
router.post("/", protect, createGoal);
router.post("/:id/toggle", protect, toggleGoal);
router.delete("/:id", protect, deleteGoal);

export default router;