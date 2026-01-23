import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import uploadRoutes from "./upload/upload.routes.js";
import authRoutes from "./routes/user.route.js";
import actionLogRoutes from "./routes/actionLog.routes.js";
import fileRoutes from "./routes/files.js";
import followRoutes from "./routes/follow.js";


const app = express();

// ─── Core ───
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(cookieParser());

// ─── MULTER FIRST ───
app.use("/api/upload", uploadRoutes);

// ─── BODY PARSERS AFTER ───
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ─── STATIC AFTER ───
app.use(express.static("public"));

// ─── OTHER ROUTES ───
app.use("/api/actions", actionLogRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/follow", followRoutes);



export default app;
