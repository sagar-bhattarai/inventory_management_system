import categoryService from "../services/category.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import config from "../configs/config.js";

const addCategory = async (req, res) => {
  try {
    const catAdded = await categoryService.add(req.body);

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
      .status(error.status || 500)
      .json(new ApiError(error.status || 500, {}, error.message ));
  }
};

const getCategoryById = async (req, res) => {};

const getAllCategories = async (req, res) => {};

const updateCategory = async (req, res) => {};

const deleteCategory = async (req, res) => {};

export {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
