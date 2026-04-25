import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken, generateRefreshToken } from "../utils/token.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // existing user

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // create user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "user registerd successfuly",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

//login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login Successful",
      accessToken,
      user: {
        _id: user._id,
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar || null,
        bio: user.bio || "",
        downloads: user.downloads || 0,
        followers: user.followers || 0,
        socialLinks: user.socialLinks || {},
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "no refresh Token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "invalid refresh token" });
    }

    const newAccessToken = generateToken(user._id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false, // ✅ MUST be false on localhost
      sameSite: "lax", // ✅ MUST be lax for Postman/browser
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  } catch (error) {
    res.status(403).json({
      message: "Refresh Token expired",
    });
  }
};

export const searchProfiles = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ users: [] });

    // Search across username, bio, location, and email (case-insensitive, partial match)
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { bio: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    }).select(
      "username email bio location avatar followers -password -refreshToken",
    );

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search profiles",
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        location: user.location || "",
        avatar: user.avatar || null,
        socialLinks: user.socialLinks || {},
        followers: user.followers || 0,
        following: user.following || 0,
        downloads: user.downloads || 0,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bio, location, socialLinks } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update fields
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (socialLinks !== undefined) {
      user.socialLinks = {
        ...user.socialLinks,
        ...socialLinks,
      };
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        location: user.location,
        avatar: user.avatar,
        socialLinks: user.socialLinks,
        followers: user.followers,
        following: user.following,
        downloads: user.downloads,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, refreshAccessToken };
