import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

// routes import
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";

// routes declaration
server.use("/api/v1/users", userRouter);
server.use("/api/v1/categories", categoryRouter);
 

export { server };
