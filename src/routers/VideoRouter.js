import express from "express";
const router = express.Router();
import multer from "../lib/multer.js"; 
import VideoController from "../controllers/VideoController.js";

router.post(
  "/",
  multer.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  VideoController.createVideo
);
router.put(
  "/:videoId",
  multer.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnailFile", maxCount: 1 },
  ]),
  VideoController.updateVideo
);
router.get("/:videoId", VideoController.getVideoById);
router.get("/", VideoController.getAllVideos);
router.delete("/:videoId", VideoController.deleteVideo);

export default router;
