import User from "../models/User.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // const user = await User.find({ "email": email});
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "user not found");
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
      throw new ApiError(401, "invalid credentials");
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

export { loginUser };
