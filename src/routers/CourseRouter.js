import express from "express";
const router = express.Router();
import storage from "../lib/multer.js";
import CourseController from "../controllers/CourseController.js";
router.post("/", storage.single("video"), CourseController.createCourse);
router.put("/:courseId", CourseController.updateCourse);
router.get("/:courseId", CourseController.getCourseById);
router.get("/", CourseController.getAllCourses);

export default router;
