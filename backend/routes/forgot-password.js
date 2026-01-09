import { log } from "console";
import crypto from "crypto";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not Found" });
    }

    // generate random token
const refreshToken = crypto.randomBytes(32).toString("hex");

const hashedToken = crypto
.createHash("sha256")
.update(refreshToken)
.digest("hex")

user.resetPasswordToken = hashedToken;
user.reserPasswordExpire = Date.now() + 10 * 60 * 1000;
await user.save();


// reset link on frontend page that is 
const resetLink = `http://localhost:5173/reset-password/${resetToken}`


// send email to 
await sendEmail({
  to: user.email,
  subject: "Reset your password",
  html: `
    <h2>Password Reset</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>This link expires in 10 minutes.</p>
  `
});
  } catch(error) {
    res.status(500).json({message:"Internal server error"})
  }
};

export default forgotPassword;