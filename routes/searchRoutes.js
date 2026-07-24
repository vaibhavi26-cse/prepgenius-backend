import express from "express";
import protect from "../middleware/authMiddleware.js";
import { searchContent } from "../controllers/searchController.js";

const router = express.Router();
router.get("/", protect, searchContent);
export default router;