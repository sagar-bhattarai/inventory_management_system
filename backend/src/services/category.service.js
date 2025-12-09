import CategoryModel from "../models/Category.model.js";

const findCategoryOnDb = async (catIdOrName, searchType) => {
  // console.log("catIdOrName", catIdOrName, searchType);
  if (searchType === "name") {
    return await CategoryModel.findOne({ categoryName: catIdOrName });
  } else {
    return await CategoryModel.findById(catIdOrName);
  }
};

const add = async (req) => {
  const existingCategory = await findCategoryOnDb(req.categoryName, "name");
  if (existingCategory) {
    throw {
      status: 409,
      message: "category already exists",
    };
  }

  const newCategory = new CategoryModel({
    categoryName: req.categoryName,
    categoryDescription: req.categoryDescription,
  });

  return await newCategory.save();
};

export default { add };
