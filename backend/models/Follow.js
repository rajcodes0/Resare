import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    clickedSocial: {
      type: Boolean,
      default: false,
    },

    followedAt: {
      type: Date,
      default: Date.now, // ✅ FIX
    },

    unlockAt: {
      type: Date,
      required: true, // ✅ CORE FEATURE
    },

    isActive: {
      type: Boolean,
      default: true, // ✅ unfollow after 30 days
    },
  },
  { timestamps: true }
);

// prevent duplicate follows
followSchema.index({ userId: 1, creatorId: 1 }, { unique: true });

export default mongoose.model("Follow", followSchema);
