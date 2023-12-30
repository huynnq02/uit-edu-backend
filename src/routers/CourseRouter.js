import express from "express";
const router = express.Router();
import CourseController from "../controllers/CourseController.js";
import storage from "../lib/multer.js";
import verifyToken from "../middlewares/JWT.js";

router.post(
  "/",
  storage.single("thumbnailFile"),
  verifyToken,
  CourseController.createCourse
);
router.put("/:courseId", verifyToken, CourseController.updateCourse);
router.get("/:courseId", verifyToken, CourseController.getCourseById);
router.get("/", verifyToken, CourseController.getAllCourses);
router.delete("/:courseId", verifyToken, CourseController.deleteCourse);

export default router;
