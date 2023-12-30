import express from "express";
const router = express.Router();
import JWTMiddleware from "../middlewares/JWT.js";
import { CommentController } from "../controllers/CommentController.js";

router.post("/", JWTMiddleware.verifyToken, CommentController.createComment);
router.get(
  "/course/:courseId",
  JWTMiddleware.verifyToken,
  CommentController.getCommentsByCourse
);
router.put(
  "/:commentId",
  JWTMiddleware.verifyToken,
  CommentController.updateComment
);
router.delete(
  "/:commentId",
  JWTMiddleware.verifyToken,
  CommentController.deleteComment
);

export default router;
