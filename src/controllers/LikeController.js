// LikeController.js
import Like from "../models/like.js";
import Video from "../models/video.js";

const LikeController = {
  createLike: async (req, res) => {
    try {
      const { userId, videoId } = req.body;

      const existingLike = await Like.findOne({ user: userId, video: videoId });

      if (existingLike) {
        return res.status(400).json({
          success: false,
          errors: ["User already liked this video"],
        });
      }

      const newLike = new Like({
        user: userId,
        video: videoId,
      });

      const savedLike = await newLike.save();

      const video = await Video.findById(videoId);
      if (video) {
        video.likes.push(savedLike._id);
        await video.save();
      } else {
        return res.status(404).json({
          success: false,
          errors: ["Video not found"],
        });
      }

      return res.status(201).json({ success: true, message: savedLike });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  getLikesForVideo: async (req, res) => {
    try {
      const videoId = req.params.videoId;

      const video = await Video.findById(videoId).populate("likes");

      if (!video) {
        return res.status(404).json({
          success: false,
          errors: ["Video not found"],
        });
      }

      return res.status(200).json({ success: true, message: video.likes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        errors: ["Server Internal Error"],
      });
    }
  },

  deleteLike: async (req, res) => {
    try {
      const { userId, videoId } = req.params;

      const like = await Like.findOneAndDelete({
        user: userId,
        video: videoId,
      });

      if (!like) {
        return res
          .status(404)
          .json({ success: false, errors: ["Like not found"] });
      }

      const video = await Video.findById(videoId);
      if (video) {
        video.likes.pull(like._id);
        await video.save();
      }

      return res.status(200).json({ success: true, message: like });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        errors: ["Server Internal Error"],
      });
    }
  },
};

export default LikeController;
