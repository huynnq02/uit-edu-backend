import express from "express";
const router = express.Router();
import JWTMiddleware from "../middlewares/JWT.js";
import { CommentController } from "../controllers/CommentController.js";

router.post("/", JWTMiddleware.verifyToken, CommentController.createComment);
router.get(
  "/video/:videoId",
  JWTMiddleware.verifyToken,
  CommentController.getCommentsByVideo
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
