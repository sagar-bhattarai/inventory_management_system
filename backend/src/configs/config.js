// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// dotenv.config({
//   path: path.join(__dirname, "../..", ".env"),
// });



import dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});

const config = {
  api:{
        name: process.env.NAME || "Inventory Management System",
        version: process.env.VERSION || "1.0.0",
        port: process.env.PORT || 5000,
        status: process.env.STATUS || "OK",
  },
  cors: process.env.CORS_ORIGIN || "*",
  mongo_db_uri: process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017",
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || "abcdefghijklmnopqrstuvwxyz",
  access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY || "12hr",
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || "abcdefghijklmnopqrstuvwxyz_1234567890",
  refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY || "5d",
};

export default config;