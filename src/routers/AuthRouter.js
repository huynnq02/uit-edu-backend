import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/AuthController.js";
import JWTMiddleware from "../middlewares/JWT.js";

router.post("/", AuthController.loginUser);
router.put(
  "/:userId/lock",
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  AuthController.lockUser
);

export default router;
