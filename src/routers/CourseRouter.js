import express from "express";
const router = express.Router();
import CourseController from "../controllers/CourseController.js";
import storage from "../lib/multer.js";
import JWTMiddleware from "../middlewares/JWT.js";

router.post(
  "/",
  storage.single("thumbnailFile"),
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  CourseController.createCourse
);
router.put(
  "/:courseId",
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  CourseController.updateCourse
);
router.get(
  "/:courseId",
  JWTMiddleware.verifyToken,
  CourseController.getCourseById
);
router.get("/", JWTMiddleware.verifyToken, CourseController.getAllCourses);
router.delete(
  "/:courseId",
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  CourseController.deleteCourse
);

export default router;
