import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "User",
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
});

UserSchema.methods.generateOTP = async function () {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  this.otp = otp;
  this.otpExpires = Date.now() + 5 * 60 * 1000;
  await this.save();
  return otp;
};

UserSchema.methods.varifyOTP = function (enteredOtp) {
  if (enteredOtp !== this.otp || Date.now() > this.otpExpires) return false;
  return true;
};

UserSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const User = mongoose.model("user", UserSchema);
export default User;
