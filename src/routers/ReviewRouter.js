import express from "express";
const router = express.Router();
import { ReviewController } from "../controllers/ReviewController.js";

router.post("/", ReviewController.createReview);
router.get("/", ReviewController.getReviews);
router.put("/:reviewId", ReviewController.updateReview);
router.delete("/:reviewId", ReviewController.deleteReview);

export default router;
