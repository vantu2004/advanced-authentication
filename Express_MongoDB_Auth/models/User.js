import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: {
    type: String,
    default: null,
  },

  otpExpiry: {
    type: Date,
    default: null,
  },

  resetPasswordToken: {
    type: String,
    default: null,
  },

  resetPasswordExpiresAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
