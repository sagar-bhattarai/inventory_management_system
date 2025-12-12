import User from "../models/User.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import config from "../configs/config.js";
import { Error } from "mongoose";

// user cannot modify cookie in the frontend after using this options
const options = {
  httpOnly: true,
  secure: true,
};

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "Error while generating tokens", error);
  }
};

const guestUser = async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        api: config.api,
      },
      "you are a guest user.!!"
    )
  );
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // const user = await User.findOne({$or: [{ email }, { name }], });
    const user = await User.findOne({ email });

    if (!user) {
      // throw new ApiError(401, "user not found");
      return res.status(401).json(new ApiError(401, {}, "user not found"));
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
      // throw new ApiError(401, "invalid credentials");
      return res.status(401).json(new ApiError(401, {}, "invalid credentials"));
    }

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            api: config.api,
            user: loggedInUser,
            refreshToken,
            accessToken,
          },
          "user logged in successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "internal server error", error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const loggedOut = await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        message: "user logged out successfully"
    })
  } catch (error) {
    return res.status(500).json({message: "Error while logging out"});
  }
};
export { loginUser, guestUser, logoutUser };
