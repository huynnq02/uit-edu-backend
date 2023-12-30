import express from "express";
const router = express.Router();
import CategoryController from "../controllers/CategoryController.js";
import JWTMiddleware from "../middlewares/JWT.js";
router.post(
  "/",
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  CategoryController.createCategory
);
router.put(
  "/:categoryId",
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  CategoryController.updateCategory
);
router.get(
  "/:categoryId",
  JWTMiddleware.verifyToken,
  CategoryController.getCategoryById
);
router.get("/", JWTMiddleware.verifyToken, CategoryController.getAllCategories);
router.delete(
  "/:categoryId",
  JWTMiddleware.verifyToken,
  JWTMiddleware.checkAdminRole,
  CategoryController.deleteCategory
);

export default router;
