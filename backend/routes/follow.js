import express from "express";
import {
  followCreator,
  unfollowCreator,
  getFollowStatus,
} from "../controllers/follow-controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:creatorId", authMiddleware, followCreator);
router.delete("/:creatorId", authMiddleware, unfollowCreator);
router.get("/:creatorId/status", authMiddleware, getFollowStatus);

export default router;
