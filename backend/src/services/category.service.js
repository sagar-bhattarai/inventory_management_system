import CategoryModel from "../models/Category.model.js";

const findCategoryOnDb = async (catIdOrName, searchType) => {
  if (searchType === "name") {
    return await CategoryModel.findOne({ catIdOrName });
  } else {
    return await CategoryModel.findById({ catIdOrName });
  }
};

const add = async (req) => {
  const existingCategory = await findCategoryOnDb(req.categoryName, "name");

  console.log("existingCategory", existingCategory);

  if (existingCategory) {
    throw {
      status: 400,
      message: "category already exists",
    };
  }

  return await CategoryModel.create({
    categoryName: req.categoryName,
    categoryDescrition: req.categoryDescrition,
  });
};

export default { add };
