import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { logSocialAction } from "../controllers/actionLog-controller.js";

const router = express.Router();

// Called when user clicks social link
router.post(
  "/:creatorId",
  authMiddleware,
  logSocialAction
);

export default router;
