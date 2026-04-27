import { File } from "../models/File.js";
import cloudinary from "../Db/cloudinary.js";

export const downloadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file || !file.document?.url) {
      return res.status(404).json({
        message: "File data not available",
      });
    }

    // Option 1: Redirect to Cloudinary (recommended)
    return res.redirect(file.document.url);

    // Option 2 (later): Stream file manually if needed
  } catch (error) {
    return res.status(500).json({
      message: "Failed to download file",
      error: error.message,
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const userId = req.user._id;

    // Find the file
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Check if user is the creator/owner
    if (file.creatorId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You don't have permission to delete this file",
      });
    }

    // Delete from Cloudinary if it has a public_id
    if (file.document?.public_id) {
      try {
        await cloudinary.uploader.destroy(file.document.public_id);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
        // Don't fail if cloudinary deletion fails, continue to delete from DB
      }
    }

    // Delete from database
    await File.findByIdAndDelete(fileId);

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};
