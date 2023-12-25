import express from "express";
const router = express.Router();
import { CommentController } from "../controllers/CommentController.js";

router.post("/", CommentController.createComment);
router.get("/course/:courseId", CommentController.getCommentsByCourse);

export default router;
