import dotenv from "dotenv";
dotenv.config();
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import studyPlanRoutes from "./routes/studyPlanRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import dashboardGoalRoutes from "./routes/dashboardGoalRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// PASTE YOUR MONGODB LINK DIRECTLY BETWEEN THE QUOTES BELOW:
const MONGO_URI = process.env.MONGO_URI;

// Connect to your MongoDB cloud database
mongoose
  .connect(MONGO_URI)
  .then(() =>
    console.log("✅ Awesome! Connected to MongoDB Atlas successfully."),
  )
  .catch((err) => console.error("❌ Database connection error:", err));

// MIDDLEWARE PIPELINES
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/placement", placementRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/study-plan", studyPlanRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/goals", dashboardGoalRoutes);
// TEST ROUTE (Health Check)
app.get("/", (req, res) => {
  res.send("PrepGenius AI Server is running perfectly!");
});

// START THE LISTENER INTERFACE
app.listen(PORT, () => {
    console.log(`🚀 PrepGenius Core Engine Active!`);
    console.log(`➜ Local Server Link: http://localhost:${PORT}`);
    console.log(`✉️ Listening for incoming frontend network requests...`);
});