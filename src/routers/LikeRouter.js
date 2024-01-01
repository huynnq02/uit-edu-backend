// likeRoutes.js
import express from "express";
const router = express.Router();
import JWTMiddleware from "../middlewares/JWT.js";
import LikeController from "../controllers/LikeController.js";

router.post("/like", JWTMiddleware.verifyToken, LikeController.createLike);

router.get(
  "/:videoId/likes",
  JWTMiddleware.verifyToken,
  LikeController.getLikesForVideo
);
router.delete(
  "/:userId/:videoId",
  JWTMiddleware.verifyToken,
  LikeController.deleteLike
);

export default router;
