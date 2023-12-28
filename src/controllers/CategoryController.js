import Category from "../models/category.js";

const CategoryController = {
  // Create a new category
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const newCategory = new Category({
        name,
      });

      const savedCategory = await newCategory.save();

      return res.status(201).json({ success: true, message: savedCategory });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },

  // Update category information
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        { name },
        { new: true }
      );

      return res.status(200).json({ success: true, message: updatedCategory });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, errors: ["Bad Request"] });
    }
  },

  // Get category details by ID
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.categoryId).populate(
        "courses"
      );
      return res.status(200).json({ success: true, message: category });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ success: false, errors: ["Category not found"] });
    }
  },

  // Get a list of all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find().populate("courses");
      return res.status(200).json({ success: true, message: categories });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;

      const deletedCategory = await Category.findByIdAndDelete(categoryId);

      if (!deletedCategory) {
        return res
          .status(404)
          .json({ success: false, errors: ["Category not found"] });
      }

      return res
        .status(200)
        .json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, errors: ["Server Internal Error"] });
    }
  },
};

export default CategoryController;
