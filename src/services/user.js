import { User } from "../models/user.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const registerUser = async (req) => {
  const { firstname, lastname, company, email, password } = req.body;
  const isUserAlreadyExist = await User.findOne({ email });
  if (isUserAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const user = await User.create({
    firstname,
    lastname,
    company,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdUser;
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new CustomError(
      statusCodes?.internalServerError,
      "Something went wrong while generating refresh and access tokens.",
      errorCodes?.server_error,
    );
  }
};

export const loginUser = async (req) => {
  const { email, password } = req.body;

  console.log("reqbody",req.body)

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(
      statusCodes?.ok,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  let passwordVerify = false
  if (user.password == password) {
    passwordVerify = true
  }
  if (!passwordVerify) {
    throw new CustomError(
      statusCodes?.ok,
      Message?.inValid,
      errorCodes?.invalid_credentials,
    );
  }

  return {
    success:true,
    userData: user,
    message: "login successfully", 
    resCode : "LOGIN_SUCCESS"
  }
};
