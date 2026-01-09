import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  documnet: {
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
  },
},{timestamps:true});

export const File = mongoose.model(("File", fileSchema));
