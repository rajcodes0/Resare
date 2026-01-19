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
      required: true,
    },

    accessGranted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

followSchema.index({userId: 1, creatorId: 1},{unique:true});
export default mongoose.model("follow", followSchema);