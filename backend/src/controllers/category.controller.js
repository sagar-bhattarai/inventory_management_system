import categoryService from "../services/category.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import config from "../configs/config.js";

const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    const catAdded = categoryService.add(categoryName, categoryDescription);

    if (!catAdded) {
      return res
        .status(400)
        .json(new ApiError(500, {catAdded}, "could not add category"));
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          api: config.api,
          category: catAdded,
        },
        "category added successfully"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, {error}, "error while adding category"));
  }
};

const getCategoryById = async (req, res) => {};

const getCategories = async (req, res) => {};

const updateCategory = async (req, res) => {};

const deleteCategory = async (req, res) => {};

export {
  addCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
