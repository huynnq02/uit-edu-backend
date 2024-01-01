import Course from "../models/course.js";
import fs from "fs";
import cloudinary from "../lib/cloudinary.js";
import PAGINATION_CONSTANTS from "../constants/PaginationConstant.js";
const CourseController = {
  createCourseWithText: async (req, res) => {
    try {
      const { title, description, category, thumbnail } = req.body;

      if (!title || !description || !category || !thumbnail) {
        return res.status(400).json({
          success: false,
          errors: ["Title, Description, Category, and Thumbnail are required"],
        });
      }

      const newCourse = new Course({
        title,
        description,
        thumbnail,
        category,
      });

      const savedCourse = await newCourse.save();
      return res.status(201).json({ success: true, message: savedCourse });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
  searchCourses: async (req, res) => {
    try {
      const { query } = req.query;
      console.log(query);
      if (!query) {
        return res.status(400).json({
          success: false,
          errors: ["Query parameter is required for search"],
        });
      }

      // Use text index to perform a search on title and description
      const courses = await Course.find(
        { $text: { $search: query } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .populate("category")
        .populate("video");

      return res.status(200).json({ success: true, message: courses });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
  createCourse: async (req, res) => {
    try {
      const { title, description, category } = req.body;

      if (!title || !description || !category || !req.file) {
        return res.status(400).json({
          success: false,
          errors: ["Title, Description, Category, and Thumbnail are required"],
        });
      }

      const thumbnailFile = req.file;

      try {
        const thumbnailResult = await cloudinary.uploader.upload(
          thumbnailFile.path,
          {
            resource_type: "image",
            folder: "thumbnails",
          }
        );

        // Cleanup temporary file
        fs.unlinkSync(thumbnailFile.path);

        const newCourse = new Course({
          title,
          description,
          thumbnail: thumbnailResult.secure_url,
          category,
        });

        const savedCourse = await newCourse.save();
        return res.status(201).json({ success: true, message: savedCourse });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          success: false,
          errors: ["Error uploading thumbnail to Cloudinary"],
        });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const { title, description, category } = req.body;

      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        { title, description, category },
        { new: true }
      );

      return res.status(200).json({ success: true, message: updatedCourse });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, errors: ["Bad Request"] });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId)
        .populate("category")
        .populate("video");
      return res.status(200).json({
        success: true,
        message: course,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ success: false, errors: ["Course not found"] });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize =
        parseInt(req.query.pageSize) || PAGINATION_CONSTANTS.PAGE_SIZE;
      const skip = (page - 1) * pageSize;

      const courses = await Course.find()
        .populate("category")
        .populate("video")
        .skip(skip)
        .limit(pageSize);
      const totalCourses = await Course.countDocuments();
      const totalPages = Math.ceil(totalCourses / pageSize);
      return res.status(200).json({
        success: true,
        message: courses,
        totalCourses: totalCourses,
        totalPages: totalPages,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const courseId = req.params.courseId;

      const course = await Course.findById(courseId).populate("video");

      if (!course) {
        return res
          .status(404)
          .json({ success: false, errors: ["Course not found"] });
      }

      if (course.video && course.video.length > 0) {
        const videoIds = course.video.map((video) => video._id);
        await Video.deleteMany({ _id: { $in: videoIds } });
      }

      const deletedCourse = await Course.findByIdAndDelete(courseId);

      return res.status(200).json({ success: true, message: deletedCourse });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};

export default CourseController;
