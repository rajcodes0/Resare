import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken, generateRefreshToken } from "../utils/token.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // existing user

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // create user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
    });
    await user.save();
    res.status(201).json({
      message: "user registerd successfuly",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

//login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

   res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 15 * 60 * 1000,
});

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    
    res.json({
      message:"Login Successful ",
      user:{
        id:user._id,
        username:user.username,
        email:user.email,
      },
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const refreshAccessToken = async (req ,res) =>{
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(401).json({message:'no refresh Token'});
    }

const decoded  = jwt.verify(
  refreshToken,
  process.env.JWT_REFRESH_SECRET
);

const user = await User.findById(decoded.userId);
if(!user || user.refreshToken !== refreshToken){
  return res.status(403).json({message:"invalid refresh token"});
}

const newAccessToken = generateToken(user._id);

res.cookie("accessToken", newAccessToken, {
  httpOnly: true,
  secure: false,      // ✅ MUST be false on localhost
  sameSite: "lax",    // ✅ MUST be lax for Postman/browser
  maxAge: 15 * 60 * 1000,
});


res.json({message: "Access token refreshed"});

  } catch (error) {
    res.status(403).json({
      message:"Refresh Token expired"
    })
  }
  
}

export {registerUser,loginUser,refreshAccessToken}





























