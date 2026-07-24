import Content from "../models/Content.js";

export const searchContent = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.status(200).json({ success: true, results: [] });
    }
    const regex = new RegExp(q.trim(), "i");
    const results = await Content.find({ title: regex })
      .select("title subject type")
      .limit(15)
      .lean();
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("searchContent error:", error);
    res.status(500).json({ success: false, message: "Search failed." });
  }
};