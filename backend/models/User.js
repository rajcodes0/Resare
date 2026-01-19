import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
];

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      validate: {
        validator: function (value) {
          // Allow all domains for OAuth users
          if (this.provider !== "local") return true;

          const domain = value.split("@")[1];
          return allowedDomains.includes(domain);
        },
        message: "Email provider not supported"
      }
    },

    password: {
      type: String,
      minlength: 6,
      required: function () {
        return this.provider === "local";
      }
    },

    provider: {
      type: String,
      enum: ["local", "google", "github", "apple"],
      default: "local"
    },

    providerId: {
      type: String
    },

    refreshToken: {
      type: String
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  if (!this.password) return next;

  this.password = await bcrypt.hash(this.password, 10);
  next;
});


const User = mongoose.model("User", UserSchema);
export default User;
