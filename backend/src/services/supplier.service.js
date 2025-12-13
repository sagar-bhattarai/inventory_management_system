import SupplierModel from "../models/Supplier.model.js";

const findSupplierOnDb = async (supplierIdOrEmail, searchType) => {
    if (searchType === "email") {
        return await SupplierModel.findOne({ supplierEmail: supplierIdOrEmail });
    } else {
        return await SupplierModel.findById(supplierIdOrEmail);
    }
};

const add = async (req) => {
    const checkExistingSupplier = await findSupplierOnDb(req.email, "email");

    if (checkExistingSupplier) {
        throw {
            status: 409,
            message: "Supplie already exists.",
        };
    }

    return await SupplierModel.create(req);
};

const all = async () => {
    const suppliers = await SupplierModel.find(
        {},
        { createdAt: 0, updatedAt: 0 }
    ).limit(10);

    if (!suppliers) {
        throw {
            status: 409,
            message: "No Any Supplier Found",
        };
    }

    return suppliers;
};

const edit = async (req) => {
    const supplierOnDb = await findSupplierOnDb(req.body.id, "id");

    if (!supplierOnDb) {
        throw {
            status: 400,
            message: "supplier does not exist",
        };
    }

    console.log("supplierOnDb", supplierOnDb);
    console.log("req.body", req.body);

    const updateThis = {
        name: req.body.name || supplierOnDb.name,
        email: req.body.email || supplierOnDb.email,
        phone: req.body.phone || supplierOnDb.phone,
        address: req.body.address || supplierOnDb.address,
    };

    const edited = await SupplierModel.findByIdAndUpdate(
        req.param.id,
        { updateThis },
        { new: true }
    );

    if (!edited) {
        throw {
            status: 400,
            message: "could not delete supplier",
        };
    }

    return edited;
};

const remove = async (id) => {
    const removed = await SupplierModel.findByIdAndDelete(id);

    if (!removed) {
        throw {
            status: 400,
            message: "could not delete supplier",
        };
    }

    return removed;
};

export default { add, all, edit, remove };
