import express from "express";
const router = express.Router();
import CourseController from "../controllers/CourseController.js";
router.post("/", CourseController.createCourse);
router.put("/:courseId", CourseController.updateCourse);
router.get("/:courseId", CourseController.getCourseById);
router.get("/", CourseController.getAllCourses);

export default router;
