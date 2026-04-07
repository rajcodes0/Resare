import dotenv from "dotenv";
import connectDB from "./Db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT= process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on : ${PORT}`);
  });

  app.get("/ping", (req, res) => {
    res.send("pong");
  });
});
