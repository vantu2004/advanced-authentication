import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const login = (req, res) => {
  const { email, password } = req.body;
  // Perform login logic here
  res.send("Login successful");
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generate a 6-digit verification token
    const verificationTokenExpiresAt = Date.now() + 3600000; // 1 hour

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt,
    });
    const savedUser = await user.save();

    generateTokenAndSetCookie(res, savedUser._id);

    console.log("Cookie header:", res.getHeader("Set-Cookie"));

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        ...savedUser._doc, // chỉ trả về đúng các field của savedUser, ko có các field thông tin
        password: undefined,
        verificationToken: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const logout = (req, res) => {
  // Perform logout logic here
  res.send("Logout successful");
};
