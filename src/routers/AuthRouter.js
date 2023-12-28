import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/AuthController.js";

router.post("/", AuthController.loginUser);
router.put("/:userId/lock", AuthController.lockUser);

export default router;
