import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getDSATracker,
  updateDSAStatus,
  getResumeTemplates,
  getCompanyList,
  getCompanyQuestionFiles,
  getChallenges,
  updateChallengeStatus,
} from "../controllers/placementController.js";
import {
  getInterviewStories,
  createInterviewStory,
  toggleHelpful,
} from "../controllers/interviewStoryController.js";




const router = express.Router();

router.get("/dsa-tracker", protect, getDSATracker);
router.post("/dsa-tracker/status", protect, updateDSAStatus);
router.get("/resume-templates", protect, getResumeTemplates);
router.get("/companies", protect, getCompanyList);
router.get("/company-questions", protect, getCompanyQuestionFiles);

router.get("/interview-stories", protect, getInterviewStories);
router.post("/interview-stories", protect, createInterviewStory);
router.post("/interview-stories/:id/helpful", protect, toggleHelpful);
router.get("/challenges", protect, getChallenges);
router.post("/challenges/status", protect, updateChallengeStatus);
export default router;