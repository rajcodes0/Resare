import express from "express";
import { upload } from "../middlewares/file.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/test-upload", upload.single("file"), async (req, res) => {
    console.log("Content-Type:", req.headers["content-type"]);
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
