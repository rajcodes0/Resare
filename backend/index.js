import dotenv from 'dotenv';
import connectDB from './Db/db.js';
import app from './app.js'; 
dotenv.config({
  path: './.env'
});


connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});

