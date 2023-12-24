import express from "express";
const router = express.Router();
import CategoryController from "../controllers/CategoryController.js";
router.post("/", CategoryController.createCategory);
router.put("/:categoryId", CategoryController.updateCategory);
router.get("/:categoryId", CategoryController.getCategoryById);
router.get("/", CategoryController.getAllCategories);

export default router;
