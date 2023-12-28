import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";

router.post("/", UserController.createUser);
router.post("/admin/", UserController.createAdminUser);

router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.getUserById);
router.get("/", UserController.getAllUsers);
router.post("/:userId/bookmarks", UserController.addBookmark);
router.delete("/:userId/bookmarks", UserController.deleteBookmark);

export default router;
