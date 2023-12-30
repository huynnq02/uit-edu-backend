import express from "express";
const router = express.Router();
import multer from "../lib/multer.js";
import VideoController from "../controllers/VideoController.js";
import JWTMiddleware from "../middlewares/JWT.js";

router.post(
  "/",
  multer.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  VideoController.createVideo
);
router.put(
  "/:videoId",
  multer.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,

  VideoController.updateVideo
);
router.get(
  "/:videoId",
  JWTMiddleware.verifyToken,
  VideoController.getVideoById
);
router.get("/", JWTMiddleware.verifyToken, VideoController.getAllVideos);
router.delete(
  "/:videoId",
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,

  VideoController.deleteVideo
);

export default router;
