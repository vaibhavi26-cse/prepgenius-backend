import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getChatHistory, sendMessage, clearChatHistory } from "../controllers/aiAssistantController.js";

const router = express.Router();

router.get("/messages", protect, getChatHistory);
router.post("/messages", protect, sendMessage);
router.delete("/messages", protect, clearChatHistory);

export default router;