import Video from "../models/video.js";
import Course from "../models/course.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";
const VideoController = {
  createVideo: async (req, res) => {
    try {
      const { title, course } = req.body;

      if (
        !title ||
        !course ||
        !req.files ||
        !req.files.videoFile ||
        !req.files.thumbnailFile
      ) {
        return res.status(400).json({
          success: false,
          errors: ["Title, course, video file, and thumbnail are required"],
        });
      }
      console.log("pass");
      const videoFile = req.files.videoFile[0];
      const thumbnailFile = req.files.thumbnailFile[0];
      console.log(req.files);

      try {
        const videoResult = await cloudinary.uploader.upload(videoFile.path, {
          resource_type: "video",
          folder: "videos",
        });

        const thumbnailResult = await cloudinary.uploader.upload(
          thumbnailFile.path,
          {
            resource_type: "image",
            folder: "thumbnails",
          }
        );

        fs.unlinkSync(videoFile.path);
        fs.unlinkSync(thumbnailFile.path);

        const newVideo = new Video({
          title,
          src: videoResult.secure_url,
          thumbnail: thumbnailResult.secure_url,
          course,
        });

        const savedVideo = await newVideo.save();

        const existingCourse = await Course.findById(course);
        if (existingCourse) {
          await Course.findByIdAndUpdate(course, {
            $push: { video: savedVideo._id },
          });
        } else {
          return res.status(404).json({
            success: false,
            errors: ["Course not found"],
          });
        }

        return res.status(201).json({ success: true, message: savedVideo });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res
          .status(500)
          .json({ success: false, errors: ["Error uploading to Cloudinary"] });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  updateVideo: async (req, res) => {
    try {
      const { title } = req.body;
      const videoId = req.params.videoId;

      const existingVideo = await Video.findById(videoId);

      const newSrc = req.files.videoFile ? req.files.videoFile[0] : null;
      const newThumbnail = req.files.thumbnailFile
        ? req.files.thumbnailFile[0]
        : null;

      if (newSrc && existingVideo.src) {
        await cloudinary.uploader.destroy(existingVideo.src);
      }

      if (newThumbnail && existingVideo.thumbnail) {
        await cloudinary.uploader.destroy(existingVideo.thumbnail);
      }

      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { title },
        { new: true }
      );

      if (newSrc) {
        const videoResult = await cloudinary.uploader.upload(newSrc.path, {
          resource_type: "video",
          folder: "videos",
        });

        updatedVideo.src = videoResult.secure_url;
      }

      if (newThumbnail) {
        const thumbnailResult = await cloudinary.uploader.upload(
          newThumbnail.path,
          {
            resource_type: "image",
            folder: "thumbnails",
          }
        );

        updatedVideo.thumbnail = thumbnailResult.secure_url;
      }

      await updatedVideo.save();

      if (newSrc) {
        fs.unlinkSync(newSrc.path);
      }

      if (newThumbnail) {
        fs.unlinkSync(newThumbnail.path);
      }

      return res.status(200).json({ success: true, message: updatedVideo });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, errors: ["Bad Request"] });
    }
  },

  getVideoById: async (req, res) => {
    try {
      const video = await Video.findById(req.params.videoId);
      return res.status(200).json({ success: true, message: video });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ success: false, errors: ["Video not found"] });
    }
  },

  getAllVideos: async (req, res) => {
    try {
      const videos = await Video.find();
      return res.status(200).json({ success: true, message: videos });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  deleteVideo: async (req, res) => {
    try {
      const deletedVideo = await Video.findByIdAndDelete(req.params.videoId);

      if (!deletedVideo) {
        return res
          .status(404)
          .json({ success: false, errors: ["Video not found"] });
      }

      await Course.findByIdAndUpdate(deletedVideo.course, {
        $pull: { video: req.params.videoId },
      });

      return res.status(200).json({ success: true, message: deletedVideo });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};

export default VideoController;
