import express from "express";
const router = express.Router();
import verifyToken from "../middlewares/JWT.js";
import { CommentController } from "../controllers/CommentController.js";

router.post("/", verifyToken, CommentController.createComment);
router.get(
  "/course/:courseId",
  verifyToken,
  CommentController.getCommentsByCourse
);
router.put("/:commentId", verifyToken, CommentController.updateComment);
router.delete("/:commentId", verifyToken, CommentController.deleteComment);

export default router;
