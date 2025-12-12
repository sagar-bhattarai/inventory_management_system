import SupplierModel from "../models/Supplier.model.js";

const findCategoryOnDb = async (supploerIdOrEmail, searchType) => {
    if (searchType === "email") {
        return await SupplierModel.findOne({ categoryName: supploerIdOrEmail });
    } else {
        return await SupplierModel.findById(supploerIdOrEmail);
    }
};

const add = async (req) => {

    const checkExistingSupplier = await findCategoryOnDb(req.email, "email");

    if (checkExistingSupplier) {
        throw {
            status: 409,
            message: "Supplie already exists.",
        }
    }

    console.log("req",req)

    return await SupplierModel.create(req);
}

export default {add};