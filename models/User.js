import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
    college: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      default: "",
    },
    semester: {
      type: Number,
      default: null,
    },
    location: {
      type: String,
      default: "",
    },
    rank: {
      type: Number,
      default: null,
    },
    points: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", UserSchema);
export default User;