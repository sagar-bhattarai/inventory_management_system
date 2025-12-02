// import { dotenv } from "dotenv";
import { server } from "./server.js";
import connectDB from "./db/connection.js";


// dotenv.config({
//   path: "./.env",
// });

connectDB().then(() => {
  try {
    server.on("error", (error) => {
      console.log("error on connection", error);
      throw error;
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`server is up and running on port http://localhost:${PORT}`);
    });
  } catch (error) {
          console.log("Error::", error);
      throw error;
  }
}).catch((error)=>{
    console.log("MONGO db connection failed !!!",error)
});
