import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";
import verifyToken from "../middlewares/JWT.js";

router.post("/", UserController.createUser);
router.post("/admin/", UserController.createAdminUser);

router.put("/:userId", verifyToken, UserController.updateUser);
router.get("/:userId", verifyToken, UserController.getUserById);
router.get("/", verifyToken, UserController.getAllUsers);
router.post("/:userId/bookmarks", verifyToken, UserController.addBookmark);
router.delete("/:userId/bookmarks", verifyToken, UserController.deleteBookmark);
router.get(
  "/:userId/bookmarks",
  verifyToken,
  UserController.getAllBookmarksByUserId
);

export default router;
