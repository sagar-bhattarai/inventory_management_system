import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js"
import {addCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/add", authMiddleWare, addCategory);
router.get("/all-categories", getAllCategories);
router.put("/update", updateCategory);
router.delete("/delete", deleteCategory);
router.get("/:id", getCategoryById);

export default router;