import express from "express";
const router = express.Router();
import verifyToken from "../middlewares/JWT.js";
import { OtpController } from "../controllers/OtpController.js";
router.post("/verify_otp", OtpController.verifyOtp);
router.post("/send_otp_to_email", OtpController.sendOtpByEmail);
export default router;
