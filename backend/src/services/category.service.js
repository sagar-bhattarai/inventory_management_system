import CategoryModel from "../models/Category.model.js";

const findCategoryOnDb = async (catIdOrName, searchType) => {
  if (searchType === "name") {
    return await CategoryModel.findOne({ catIdOrName });
  } else {
    return await CategoryModel.findById({ catIdOrName });
  }
};

const add = async () =>{
//   const existingCategory = findCategoryOnDb(categoryName , "name");
}


export default {add}