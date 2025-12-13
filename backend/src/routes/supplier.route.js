import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js"
import {addSupplier, getAllSuppliers, updateSupplier, deleteSupplier} from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/add", authMiddleWare, addSupplier);
router.get("/all", getAllSuppliers);
router.put("/update/:id", authMiddleWare, updateSupplier);
router.delete("/delete/:id", authMiddleWare, deleteSupplier);

export default router;