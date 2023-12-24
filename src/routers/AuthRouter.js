import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/AuthController.js";

router.post("/", AuthController.loginUser);

export default router;
