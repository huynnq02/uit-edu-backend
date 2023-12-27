import Course from "../models/Course.js";

const CourseController = {
  createCourse: async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const newCourse = new Course({
        title,
        description,
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
      return res.status(200).json({ success: true, message: course });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ success: false, errors: ["Course not found"] });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find()
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
