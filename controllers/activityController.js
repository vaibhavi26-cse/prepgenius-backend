import ActivityLog from "../models/ActivityLog.js";

export const getHeatmap = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    const logs = await ActivityLog.find({
      user: req.user._id,
      date: { $gte: start, $lte: end },
    }).lean();

    const map = {};
    logs.forEach((l) => {
      map[l.date] = l.count;
    });

    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInYear = isLeap ? 366 : 365;

    const days = [];
    for (let i = 0; i < daysInYear; i++) {
      const d = new Date(Date.UTC(year, 0, 1 + i));
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: map[key] || 0 });
    }

    res.status(200).json({ success: true, year, days });
  } catch (error) {
    console.error("getHeatmap error:", error);
    res.status(500).json({ success: false, message: "Failed to load activity heatmap." });
  }
};

// GET /api/activity/years — which years have any data, plus current year always included
export const getActivityYears = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user._id }).select("date").lean();
    const years = new Set(logs.map((l) => l.date.slice(0, 4)));
    years.add(String(new Date().getFullYear()));
    res.status(200).json({ success: true, years: [...years].sort() });
  } catch (error) {
    console.error("getActivityYears error:", error);
    res.status(500).json({ success: false, message: "Failed to load years." });
  }
};

// GET /api/activity/streak — current streak, independent of selected year
export const getStreak = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user._id, count: { $gt: 0 } })
      .select("date")
      .lean();
    const dateSet = new Set(logs.map((l) => l.date));

    let streak = 0;
    const cursor = new Date();
    while (dateSet.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    res.status(200).json({ success: true, currentStreak: streak });
  } catch (error) {
    console.error("getStreak error:", error);
    res.status(500).json({ success: false, message: "Failed to load streak." });
  }
};