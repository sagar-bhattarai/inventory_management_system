import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js"
import {addCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/add", authMiddleWare, addCategory);
router.get("/all", getAllCategories);
router.delete("/delete", deleteCategory);
router.put("/update/:id", updateCategory);
router.get("/:id", getCategoryById);

export default router;