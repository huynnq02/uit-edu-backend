import express from "express";
const router = express.Router();
import multer from "../lib/multer.js";
import VideoController from "../controllers/VideoController.js";
import verifyToken from "../middlewares/JWT.js";

router.post(
  "/",
  multer.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  verifyToken,
  VideoController.createVideo
);
router.put(
  "/:videoId",
  multer.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  verifyToken,
  VideoController.updateVideo
);
router.get("/:videoId", verifyToken, VideoController.getVideoById);
router.get("/", verifyToken, VideoController.getAllVideos);
router.delete("/:videoId", verifyToken, VideoController.deleteVideo);

export default router;
