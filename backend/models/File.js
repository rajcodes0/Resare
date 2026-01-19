import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  creatorId: {  // ADD THIS
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
    originalName: String,
    fileType: String,
    fileSize: Number,  // ADD THIS
  },
  
  accessType: {  // ADD THIS
    type: String,
    enum: ["public", "follow_to_unlock", "private"],
    default: "public"
  }
}, {timestamps: true});

export const File = mongoose.model("File", fileSchema);