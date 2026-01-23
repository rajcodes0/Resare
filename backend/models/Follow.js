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

    socialAction: {
      platform: {
        type: String,
        enum: ["instagram", "twitter", "linkedin"],
      },
      clickedAt: Date,
    },

    followedAt: {
      type: Date,
      default: Date.now, 
    },

    unlockAt: {
      type: Date,
      required: true, 
    },

    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true },
);

// prevent duplicate follows
followSchema.index({ userId: 1, creatorId: 1 }, { unique: true });

export default mongoose.model("Follow", followSchema);
