import express from "express";
import { upload } from "../middlewares/file.middleware.js";
import { uploadOnCloudinary } from "../Db/cloudinary.js";

const router = express.Router();

router.post("/test-upload", upload.single("file"), async (req, res) => {
    console.log("Content-Type:", req.headers["content-type"]);
    if (!req.file) {
    return res.status(400).json({ success: false, message: "No file provided in field 'file'" });
}
  try {
    const result = await uploadOnCloudinary(req.file.path);
    res.json({
      success: true,
      cloudinary: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
