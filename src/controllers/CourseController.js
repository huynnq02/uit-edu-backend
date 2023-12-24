import Course from "../models/course.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"; // Import dotenv for dynamic environment variables

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CourseController = {
  // Create a new course
  createCourse: async (req, res) => {
    try {
      console.log(process.env.CLOUDINARY_CLOUD_NAME);
      console.log(process.env.CLOUDINARY_API_KEY);
      console.log(process.env.CLOUDINARY_API_SECRET);

      const { title, description } = req.body;
      console.log(req.file);

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, errors: ["Video file is required"] });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "video",
      });
      const newCourse = new Course({
        title,
        video: result.secure_url,
        description,
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

  // Update course information
  updateCourse: async (req, res) => {
    try {
      const { title, video, description } = req.body;

      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        { title, video, description },
        { new: true }
      );

      return res.status(200).json({ success: true, message: updatedCourse });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, errors: ["Bad Request"] });
    }
  },

  // Get course details by ID
  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);
      return res.status(200).json({ success: true, message: course });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ success: false, errors: ["Course not found"] });
    }
  },

  // Get a list of all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      return res.status(200).json({ success: true, message: courses });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};

export default CourseController;
