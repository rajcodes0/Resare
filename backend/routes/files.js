import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { checkFileAccess } from "../middlewares/checkFileAccess.js";
import { downloadFile } from "../controllers/file-controller.js";

const router = express.Router();

// router.get(
//   "/:fileId",
//   authMiddleware,
//   checkFileAccess,
//   downloadFile
// );

router.get("/", authMiddleware, async (req, res) => {
  try {
    const files = await File.find({ accessType: { $ne: "private" } })
      .populate("creatorId", "username");
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
});

export default router;
