import mongoose from "mongoose";

const otp = new mongoose.Schema({
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  otp: {
    required: true,
    type: String,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 2 * 60 * 1000),
  },
});
const Otp = mongoose.model("otps", otp, "otps");
export default Otp;
