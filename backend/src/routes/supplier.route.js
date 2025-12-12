import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js"
// import {addSupplier, getSupplierById, getAllSuppliers, updateSupplier, deleteSupplier} from "../controllers/supplier.controller.js";
import {addSupplier, getAllSuppliers} from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/add", authMiddleWare, addSupplier);
router.get("/all", getAllSuppliers);
// router.delete("/delete/:id", authMiddleWare, deleteSupplier);
// router.put("/update/:id", authMiddleWare, updateSupplier);

// router.get("/:id", getSupplierById);

export default router;