import express from "express";
const router = express.Router();
import CategoryController from "../controllers/CategoryController.js";
import verifyToken from "../middlewares/JWT.js";

router.post("/", verifyToken, CategoryController.createCategory);
router.put("/:categoryId", verifyToken, CategoryController.updateCategory);
router.get("/:categoryId", verifyToken, CategoryController.getCategoryById);
router.get("/", verifyToken, CategoryController.getAllCategories);
router.delete("/:categoryId", verifyToken, CategoryController.deleteCategory);

export default router;
