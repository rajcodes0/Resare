import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import authRoutes from "./routes/user.route.js";
import uploadRoutes from "./upload/upload.routes.js"



const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN ?? '*',   // <- add fallback
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true,
    limit:"16kb"
}))
app.use(cookieParser())
app.use(express.static("public"))



// Rotes 

app.use("/api/v1/auth",authRoutes)
app.use("/api", uploadRoutes);






export default app;