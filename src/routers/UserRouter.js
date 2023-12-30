import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";
import JWTMiddleware from "../middlewares/JWT.js";

router.post("/", UserController.createUser);
router.post("/admin/", UserController.createAdminUser);

router.put("/:userId", JWTMiddleware.verifyToken, UserController.updateUser);
router.get("/:userId", JWTMiddleware.verifyToken, UserController.getUserById);
router.get("/", JWTMiddleware.verifyToken, UserController.getAllUsers);
router.post(
  "/:userId/bookmarks",
  JWTMiddleware.verifyToken,
  UserController.addBookmark
);
router.delete(
  "/:userId/bookmarks",
  JWTMiddleware.verifyToken,
  UserController.deleteBookmark
);
router.get(
  "/:userId/bookmarks",
  JWTMiddleware.verifyToken,
  UserController.getAllBookmarksByUserId
);

export default router;
