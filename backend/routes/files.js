import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { checkFileAccess } from "../middlewares/checkFileAccess.js";
import { downloadFile } from "../controllers/file-controller.js";

const router = express.Router();

router.get(
  "/:fileId",
  authMiddleware,
  checkFileAccess,
  downloadFile
);

export default router;
