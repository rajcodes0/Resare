import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    console.log("ACCESS TOKEN:", token);
    console.log("JWT_SECRET IN MIDDLEWARE:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.error("JWT VERIFY ERROR:", error.name, error.message);
    return res.status(401).json({ message: "invalid token" });
  }
};
