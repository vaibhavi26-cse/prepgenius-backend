import User from "../models/User.js";

// GET /api/user/me — fetch the logged-in user's full profile
export const getMe = async (req, res) => {
  try {
    // req.user is already attached by the auth middleware
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// PUT /api/user/profile — update editable profile fields
export const updateProfile = async (req, res) => {
  try {
    const { name, college, branch, semester, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, college, branch, semester, location },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};