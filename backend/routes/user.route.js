import { Router } from "express";
import { registerUser, loginUser,refreshAccessToken } from '../controllers/user.controllers.js';
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/refresh-token",refreshAccessToken)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


export default router

