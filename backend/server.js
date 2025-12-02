import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());


// server.get("/", (req, res) => {
//   res.send("inventory management system");
// });

// routes import
import userRouter from "./routes/user.route.js";

// routes declaration
server.use("/api/v1/users", userRouter);
 

export { server };
