import express from "express";
import {addCategory, getCategoryById, getCategories, updateCategory, deleteCategory} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/add", addCategory);
router.get("/all-categories", getCategories);
router.put("/update", updateCategory);
router.delete("/delete", deleteCategory);
router.get("/:id", getCategoryById);

export default router;