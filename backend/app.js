import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./upload/upload.routes.js";
import authRoutes from "./routes/user.route.js";
import actionLogRoutes from "./routes/actionLog.routes.js";
import fileRoutes from "./routes/files.js";
import followRoutes from "./routes/follow.js";

const app = express();

dotenv.config();
// ─── Core ───
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(cookieParser());

// ─── BODY PARSERS ───
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ─── UPLOAD ROUTE ───
app.use("/api/upload", uploadRoutes);

// ─── STATIC AFTER ───
app.use(express.static("public"));

// ─── OTHER ROUTES ───
app.use("/api/actions", actionLogRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/follow", followRoutes);

export default app;
