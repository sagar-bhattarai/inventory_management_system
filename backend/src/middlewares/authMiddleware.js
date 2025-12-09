import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import config from "../configs/config.js";

const authMiddleWare = async (req, res, next) => {
  try {
    const token =
        req.headers?.authorization?.split(" ")[1] || req.cookies?.accessToken;
    if (!token) {
      throw {
        status: 401,
        message: "unauthorized request",
      };
    }

    const decodedToken = jwt.verify(token, config.access_token_secret);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw {
        status: 401,
        message: "Invalid Access Token",
      };
    }

    req.user = user;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status || 500, {}, error.message || "internal server error in auth middleware"));
  }
};


export default authMiddleWare;