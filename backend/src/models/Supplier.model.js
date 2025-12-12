import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        trim: true,
        unique: true
    },   
    address: {
        type: String,
        required: [true, "address is required"],
    },
},
    {
        timestamps: true
    });
const SupplierModel = mongoose.model("Supplier", supplierSchema);

export default SupplierModel;