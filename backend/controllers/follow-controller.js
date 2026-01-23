
import mongoose from "mongoose";
import Follow from "../models/Follow.js";
import ActionLog from "../models/ActionLog.js";


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

    if (!platform) {
      return res.status(400).json({ message: "Social platform is required" });
    }

    const actionDone = await ActionLog.findOne({
      userId,
      creatorId,
      action: `visit_${platform}`,
    });

    if (!actionDone) {
      return res.status(403).json({
        message: "Complete social action before following",
      });
    }

    const existingFollow = await Follow.findOne({ userId, creatorId });
    if (existingFollow) {
      return res.status(409).json({
        message: "Already following this creator",
      });
    }

    const now = new Date();
    const unlockAt = new Date(
      now.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    const follow = await Follow.create({
      userId,
      creatorId,
      socialAction: {
        platform,
        clickedAt: now,
      },
      followedAt: now,
      unlockAt,
      isActive: true,
    });

    return res.status(201).json({
      message: "Creator followed successfully",
      unlockAt,
      followId: follow._id,
    });
  } catch (error) {
    return res.status(500).json({
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
        message: "Follow relationship not found",
      });
    }

    const now = new Date();

    if (now < follow.unlockAt) {
      return res.status(403).json({
        message: "You cannot unfollow before 30 days",
        unlockAt: follow.unlockAt,
      });
    }

    follow.isActive = false;
    await follow.save();

    return res.status(200).json({
      message: "Unfollowed successfully",
    });
  } catch (error) {
    return res.status(500).json({
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
    const canAccess =
      follow.isActive === true && now >= follow.unlockAt;

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
