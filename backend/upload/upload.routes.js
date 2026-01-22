import express from "express";
import { upload } from "../middlewares/file.middleware.js";
import { File } from "../models/File.js";
import { uploadOnCloudinary } from "../Db/cloudinary.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/test-upload", upload.single("file"),authMiddleware, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Detect file type
    const mime = req.file.mimetype;
    let fileType = "other";
    if (mime === "application/pdf") fileType = "pdf";
    else if (mime === "application/zip") fileType = "zip";

    // Upload to cloudinary
    const cloudFile = await uploadOnCloudinary(req.file.path);

    // Save to DB
    const savedFile = await File.create({
      user: req.user._id,
      creatorId: req.user._id,
      document: {
        url: cloudFile.url,
        public_id: cloudFile.public_id,
        originalName: req.file.originalname,
        fileType,
        fileSize: req.file.size
      },
      accessType: "follow_to_unlock"
    });

    res.status(201).json({
      message: "File uploaded & saved",
      file: savedFile
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
});

export default router;