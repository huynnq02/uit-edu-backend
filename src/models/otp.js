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
});
const Otp = mongoose.model("otps", otp, "otps");
export default Otp;
