import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js"
import {addSupplier, getAllSuppliers, updateSupplier, deleteSupplier} from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/add", authMiddleWare, addSupplier);
router.get("/all", getAllSuppliers);
router.delete("/delete/:id", authMiddleWare, deleteSupplier);
router.put("/update/:id", authMiddleWare, updateSupplier);

export default router;