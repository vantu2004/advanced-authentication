import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { sendOtpEmail, sendResetPasswordEmail } from "../utils/sendMail.js";

const authController = {
  register: async (req, res) => {
    try {
      const { email, username, firstName, lastName, password } = req.body;

      console.log(req.body);

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Send OTP email
      await sendOtpEmail(email, otp);

      const newUser = new User({
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
        otp,
        otpExpiry,
      });

      await newUser.save();

      newUser.password = undefined;
      newUser.otp = undefined;

      res.status(201).json({
        message: "Registration successful",
        newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({
        email,
        otp: otp,
        otpExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid otp" });
      }

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;

      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email" });
      } else {
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "14d" }
        );

        user.password = undefined;

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 14 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          message: "Login successful",
          user,
          token,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour

      await user.save();
      await sendResetPasswordEmail(
        email,
        user.firstName,
        `http://localhost:3000/reset-password?token=${resetToken}`
      );

      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;

      console.log(req.params);
      const { newPassword } = req.body;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: "User does not exists" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;

      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default authController;
