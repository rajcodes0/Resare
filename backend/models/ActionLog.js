import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema(
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

    action: {
      type: String,
      enum: ["visit_instagram", "visit_twitter", "visit_linkedin"],
      required: true,
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate action per user per creator
actionLogSchema.index(
  { userId: 1, creatorId: 1, action: 1 },
  { unique: true }
);

export default mongoose.model("ActionLog", actionLogSchema);
