import config from "../configs/config.js";
import supplierService from "../services/supplier.service.js";

const addSupplier = async (req, res) => {
    try {
        const catAdded = await supplierService.add(req.body);

        return res.status(200).json(
            {
                api: config.api,
                supplier: catAdded,
                message: "supplier added successfully"
            },
        );
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Supplier name must be unique" });
        }
        return res
            .status(500)
            .json({ message: "server error while adding supplier." });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.all();

        return res
            .status(200)
            .json(
                {
                    api: config.api,
                    suppliers,
                    message: "fetched all suppliers successfully"
                }
            );
    } catch (error) {
        return res
            .status(500)
            .json({ message: "server error while fetching all supplier." });
    }
}

const updateSupplier = async (req, res) => {
    try {
        const edited = await supplierService.edit(req);
        return res
            .status(200)
            .json({ api: config.api, edited, message: "supplier updated successfully." });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "error while updating supplier." });
    }
}

const deleteSupplier = async (req, res) => {
    try {
        await supplierService.remove(req.params.id);

        return res
            .status(200)
            .json({ api: config.api, message: "supplier deleted successfully" });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "error while deleting supplier." });
    }
}
export { addSupplier, getAllSuppliers, deleteSupplier, updateSupplier }