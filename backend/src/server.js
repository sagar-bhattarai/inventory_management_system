import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());



// routes import
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import supplierRouter from "./routes/supplier.route.js";


// routes declaration
server.use("/api/v1/users", userRouter);
server.use("/api/v1/categories", categoryRouter);
server.use("/api/v1/suppliers", supplierRouter);
 

export { server };
