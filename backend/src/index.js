import { server } from "./server.js";
import connectDB from "./db/connection.js";
import config from "./configs/config.js";

connectDB()
  .then(() => {
    try {
      server.on("error", (error) => {
        console.log("error on connection", error);
        throw error;
      });

      server.listen(config.api.port, () => {
        console.log(
          `server is up and running on port http://localhost:${config.api.port}`
        );
      });
    } catch (error) {
      console.log("Error::", error);
      throw error;
    }
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!!", error);
  });
