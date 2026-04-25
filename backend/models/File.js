import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    creatorId: {
      // ADD THIS
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    document: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        default: null,
      },
      originalName: String,
      fileType: String,
      fileSize: Number, // ADD THIS
    },

    accessType: {
      // ADD THIS
      type: String,
      enum: ["public", "follow_to_unlock", "private"],
      default: "public",
    },

    link: {
      type: String,
      default: null,
      trim: true,
      validate: {
        validator: function (value) {
          if (!value) return true;
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        },
        message: "Invalid URL format",
      },
    },
  },
  { timestamps: true },
);

export const File = mongoose.model("File", fileSchema);
