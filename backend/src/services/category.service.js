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

  console.log(req)
  if (req.categoryName == "" || req.categoryDescription == "") {
    throw {
      status: 400,
      message: "Fields cannot be empty.",
    };
  }
  const existingCategory = await findCategoryOnDb(req.categoryName, "name");
  if (existingCategory) {
    throw {
      status: 409,
      message: "category already exists.",
    };
  }

  const newCategory = new CategoryModel({
    categoryName: req.categoryName,
    categoryDescription: req.categoryDescription,
  });

  return await newCategory.save();
};

const all = async (req) => {
  // const categories = await CategoryModel.find().projection({_id:0, categoryName:1, categoryDescription:1}).limit(5); // throws error

  const categories = await CategoryModel.find({}, { _id: 1, categoryName: 1, categoryDescription: 1 }).limit(5);
  //  const categories = await CategoryModel.find().select("categoryName categoryDescription -_id").limit(5);

  if (!categories) {
    throw {
      status: 404,
      message: "no any categories found",
    };
  }

  return categories;
};

const update = async (req) => {
  const updated = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated) {
    throw {
      status: 400,
      message: "could not update category"
    }
  }
  return updated;
}
export default { add, all, update };
