import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";

router.post("/", UserController.createUser);
router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.getUserById);
router.get("/", UserController.getAllUsers);

export default router;
