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
        return res
            .status(error.status || 500)
            .json({message: error.message || "server error while adding supplier."});
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.all(req.body);

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
            .status(error.status || 500)
            .json({message: error.message || "server error while fetching all supplier."});
    }
}

export { addSupplier, getAllSuppliers }