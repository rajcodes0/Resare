import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
];
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 13,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: function (value) {
          const domain = value.split("@")[1];
          return allowedDomains.includes(domain);
        },
        message: "Email provider not supported",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (user_id) {
  if (!this.isModified("password")) return this._id;
  this.password = await bcrypt.hash(this.password, 10);
  this._id;
});

const User = mongoose.model("User", UserSchema);
export default User;
