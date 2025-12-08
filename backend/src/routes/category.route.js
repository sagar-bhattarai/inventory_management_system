import {Router} from "express";
import {addCategory, getCategoryById, getCategories, updateCategory, deleteCategory} from "../controllers/category.controller.js";

// const router = express.Router();
const router = Router();

router.route("/add").post(addCategory);
// router.post("/add", addCategory);
// router.get("/:id", getCategoryById);
// router.get("/all-categories", getCategories);
// router.put("/update", updateCategory);
// router.delete("/delete", deleteCategory);

export default router;