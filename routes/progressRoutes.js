import express from "express";
import { toggleProgress, getProgressForSubject } from "../controllers/progressController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/toggle", protect, toggleProgress);
router.get("/:subject", protect, getProgressForSubject);

export default router;