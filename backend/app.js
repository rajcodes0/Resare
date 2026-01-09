import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import authRoutes from "./routes/user.route.js";


const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


// Rotes 

app.use("/api/v1/auth",authRoutes)





app.listen(5000, () => console.log("Server running"));

export default app;