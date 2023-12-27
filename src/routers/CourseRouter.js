import express from "express";
const router = express.Router();
import CourseController from "../controllers/CourseController.js";
import storage from "../lib/multer.js";

router.post(
  "/",
  storage.single("thumbnailFile"),
  CourseController.createCourse
);
router.put("/:courseId", CourseController.updateCourse);
router.get("/:courseId", CourseController.getCourseById);
router.get("/", CourseController.getAllCourses);
router.delete("/:courseId", CourseController.deleteCourse);

export default router;
