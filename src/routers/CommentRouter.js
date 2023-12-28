import express from "express";
const router = express.Router();
import { CommentController } from "../controllers/CommentController.js";

router.post("/", CommentController.createComment);
router.get("/course/:courseId", CommentController.getCommentsByCourse);
router.put("/:commentId", CommentController.updateComment);
router.delete("/:commentId", CommentController.deleteComment);

export default router;
