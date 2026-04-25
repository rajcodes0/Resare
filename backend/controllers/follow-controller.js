import mongoose from "mongoose";
import Follow from "../models/Follow.js";
import ActionLog from "../models/ActionLog.js";
import User from "../models/User.js";

export const followCreator = async (req, res) => {
  try {
    const userId = req.user._id;
    const { creatorId } = req.params;
    const { platform } = req.body;

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ message: "Invalid creator id" });
    }

    if (userId.toString() === creatorId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existingFollow = await Follow.findOne({ userId, creatorId });
    if (existingFollow && existingFollow.isActive) {
      return res.status(409).json({
        message: "Already following this creator",
      });
    }

    const now = new Date();
    const unlockAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Create or reactivate follow
    let follow;
    if (existingFollow && !existingFollow.isActive) {
      // Reactivate existing follow
      existingFollow.isActive = true;
      existingFollow.followedAt = now;
      existingFollow.unlockAt = unlockAt;
      if (platform) {
        existingFollow.socialAction = {
          platform,
          clickedAt: now,
        };
      }
      follow = await existingFollow.save();
    } else {
      // Create new follow
      follow = await Follow.create({
        userId,
        creatorId,
        socialAction: platform
          ? {
              platform,
              clickedAt: now,
            }
          : undefined,
        followedAt: now,
        unlockAt,
        isActive: true,
      });
    }

    // Update follower counts
    await User.findByIdAndUpdate(
      creatorId,
      { $inc: { followers: 1 } },
      { new: true },
    );

    await User.findByIdAndUpdate(
      userId,
      { $inc: { following: 1 } },
      { new: true },
    );

    return res.status(201).json({
      success: true,
      message: "Creator followed successfully",
      unlockAt,
      followId: follow._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const unfollowCreator = async (req, res) => {
  try {
    const userId = req.user._id;
    const { creatorId } = req.params;

    const follow = await Follow.findOne({
      userId,
      creatorId,
      isActive: true,
    });

    if (!follow) {
      return res.status(404).json({
        success: false,
        message: "Follow relationship not found",
      });
    }

    const now = new Date();

    if (now < follow.unlockAt) {
      return res.status(403).json({
        success: false,
        message: "You cannot unfollow before 30 days",
        unlockAt: follow.unlockAt,
      });
    }

    follow.isActive = false;
    await follow.save();

    // Update follower counts
    await User.findByIdAndUpdate(
      creatorId,
      { $inc: { followers: -1 } },
      { new: true },
    );

    await User.findByIdAndUpdate(
      userId,
      { $inc: { following: -1 } },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Unfollowed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getFollowStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { creatorId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ message: "Invalid creator id" });
    }

    const follow = await Follow.findOne({ userId, creatorId });

    if (!follow) {
      return res.status(200).json({
        isFollowing: false,
        canAccess: false,
        unlockAt: null,
      });
    }

    const now = new Date();
    const canAccess = follow.isActive === true && now >= follow.unlockAt;

    return res.status(200).json({
      isFollowing: follow.isActive,
      followedAt: follow.followedAt,
      unlockAt: follow.unlockAt,
      canAccess,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
