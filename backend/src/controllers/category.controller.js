import categoryService from "../services/category.service.js";
import config from "../configs/config.js";

const addCategory = async (req, res) => {
  try {
    const catAdded = await categoryService.add(req.body);

    return res.status(200).json(
      {
        api: config.api,
        category: catAdded,
        message: "category added successfully"
      },
    );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message, "server error while adding category.");
  }
};

const getCategoryById = async (req, res) => { };

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.all(req.body);

    return res
      .status(200)
      .json({ api: config.api, categories, message: "Categories fetched successfully." });
  } catch (error) {
    return (
      res.status(error.status || 500),
      json(error.message, "server error while fetching all category.")
    );
  }
};

const updateCategory = async (req, res) => {
  try {
    const updated = await categoryService.update(req);
    return res
      .status(200)
      .json(
        { api: config.api, category: updated, message: "Category updated successfully." },
      );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category name must be unique" });
    }
    return res
      .status(error.status || 500)
      .json({ message: error.message || { message: "error while updating category" } });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.remove(req);
    return res
      .status(200)
      .json(
        { api: config.api, category: deleted, message: "Category deleted successfully" },
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "error while deleting category" });
  }
};

export {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
