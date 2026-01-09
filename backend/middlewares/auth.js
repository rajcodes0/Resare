import jwt from 'jasonwebtoken'

const authMiddleware = (req,res,next) =>{
    try {
        const token = req.cookie.accessToken;
        if(!token) return res.status(401).json({message:"unauthorized"})

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
        res.status(401).json({message:"Token expired"})
    }
}