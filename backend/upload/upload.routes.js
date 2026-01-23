import express from "express";
import { upload } from "../middlewares/file.middleware.js";
import { File } from "../models/File.js";
import { uploadOnCloudinary } from "../Db/cloudinary.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

/**
 * Upload file (creator only)
 * Protected route
 */
router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        console.error("MULTER ERROR:", err);
        
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "File too large",
            error: "Maximum file size is 50MB",
          });
        }
        
        if (err.code === "INVALID_FILE_TYPE") {
          return res.status(400).json({
            message: "Invalid file type",
            error: err.message,
          });
        }
        
        return res.status(500).json({
          message: "File upload error",
          error: err.message,
        });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log("File received:", req.file);

      // Detect file type
      const mime = req.file.mimetype;
      let fileType = "other";
      if (mime === "application/pdf") fileType = "pdf";
      else if (mime === "application/zip") fileType = "zip";

      // Upload to Cloudinary
      const cloudFile = await uploadOnCloudinary(req.file.path);

      if (!cloudFile) {
        return res.status(500).json({
          message: "Failed to upload to Cloudinary",
        });
      }

      // Save metadata to DB
      const savedFile = await File.create({
        user: req.user._id,
        creatorId: req.user._id,
        document: {
          url: cloudFile.url,
          public_id: cloudFile.public_id,
          originalName: req.file.originalname,
          fileType,
          fileSize: req.file.size,
        },
        accessType: "follow_to_unlock",
      });

      return res.status(201).json({
        message: "File uploaded & saved",
        file: savedFile,
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

export default router;