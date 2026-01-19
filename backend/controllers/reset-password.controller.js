import crypto from "crypto";
import User from "../models/User.js";



export const resetPassword = async (req,res) =>{
    try {
        const{token} = req.params;
        const {password} = req.body;

        const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

const user = await User.findOne({
  resetPasswordToken: hashedToken,
  resetPasswordExpire: { $gt: Date.now() }
});

if(!user){
    return res.status (400).json ({message:"Invalid or Expired Token"})
}
user.password = password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;

await user.save();
res.json({message:"Password reset Successful"});
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        
    }
}