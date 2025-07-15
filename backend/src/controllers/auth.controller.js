import { Redis } from "../configs/redis.config.js";
import { USER_TYPES } from "../constants/enums.constants.js";
import { HTTP } from "../constants/http.constants.js";
import { REDIS_KEY } from "../constants/redis_keys.constants.js";
import { CatchAsyncError } from "../middleware/error.middleware.js";
import { User } from "../models/user.models.js";
import { UserAddress } from "../models/user_address.models.js";
import { SendEmail } from "../services/email.service.js";
import { APIError, APIResponse } from "../utils/api_response.utils.js";
import { GetCurrentUTCTime } from "../utils/date_time.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from "../utils/jwt_token.utils.js";
import {
  DecryptEncryptionData,
  EncryptData,
} from "../utils/keys_identifier.utils.js";

export const signup = CatchAsyncError(async (req, res, next) => {
  const { cid, state } = req.query;

  if (req.body.user_type === USER_TYPES.VENDOR && !req.body.sub_role)
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "Sub role is required",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );
  const encryptedEmail = EncryptData(req.body.email);
  const key = REDIS_KEY.USERS;
  // find user based on email on redis db
  const isUser = await Redis.HGET(key, encryptedEmail);

  if (isUser)
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "User already exists",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  // create user address and hash password
  const [user_address, encryptedPassword] = await Promise.all([
    UserAddress.create({
      state,
    }),

    EncryptData(req.body.password),
  ]);

  // else create new user
  const user = await User.create({
    ...req.body,
    email: encryptedEmail,
    password: encryptedPassword,
    client_id: cid,
    user_address: user_address._id,
  });

  // store user and password inside db
  await Redis.HSET(key, encryptedEmail, encryptedPassword);

  // send response
  return APIResponse(res, HTTP.STATUS.CREATED, "User Registered successfully.");
});

export const sendOtp = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const encryptedEmail = EncryptData(email);
  const cachedKey = REDIS_KEY.OTP + ":" + encryptedEmail;

  // check from redis if key is still present then throw error
  const isCachedKey = await Redis.GET(cachedKey);
  if (isCachedKey)
    return APIError(
      res,
      HTTP.STATUS.TOO_MANY_REQUEST,
      `OTP has already been sent to ${email}`,
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  // generate 6 digit otp
  const otp = Math.floor(100000 + Math.random() * 900000);

  // send otp on email with email template
  await SendEmail(email, otp);

  // store in redis with expiry of 5 min
  await Redis.SET(cachedKey, EncryptData(otp), { EX: 300 });
  // send response
  return APIResponse(res, HTTP.STATUS.OK, "OTP send to email :" + email);
});

export const verifyEmail = CatchAsyncError(async (req, res, next) => {
  let { email, otp } = req.body;
  const encryptedEmail = EncryptData(email);
  //   check if key exists if not otp expired
  const cachedKey = `${REDIS_KEY.OTP}:${encryptedEmail}`;

  const [cachedOtp, user] = await Promise.all([
    // check for valid otp
    Redis.GET(cachedKey),
    // find user
    User.findOne({ email: encryptedEmail }),
  ]);

  if (!user)
    return APIError(
      res,
      HTTP.STATUS.NOT_FOUND,
      "Invalid email",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  if (!cachedOtp)
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "Otp Expired",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  if (cachedOtp !== EncryptData(otp))
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "Invalid Otp",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  // update user
  if (!user.isEmailVerified) {
    user.isEmailVerified = true;
    await user.save();
  }

  // send response
  return APIResponse(res, HTTP.STATUS.OK, "Email has been verified", {
    isEmailVerified: user.isEmailVerified,
  });
});

export const verifyPhone = CatchAsyncError(async (req, res, next) => {
  let { phone } = req.body;
  phone = DecryptEncryptionData(phone);
});

export const login = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const encryptedEmail = EncryptData(email);
  const key = REDIS_KEY.USERS;

  // find user in redis db
  const [storedPassword, encryptedPassword] = await Promise.all([
    Redis.HGET(key, encryptedEmail),
    EncryptData(password),
  ]);

  if (!storedPassword || storedPassword !== encryptedPassword)
    return APIError(
      res,
      HTTP.STATUS.FORBIDDEN,
      "Invalid email or password",
      HTTP.ERROR_TYPES.AUTH_ERROR
    );

  // find user in db and update last loggedin field
  const user = await User.findOneAndUpdate(
    { email: encryptedEmail },
    { $set: { last_logged_in: GetCurrentUTCTime() } },
    { new: true }
  );
  // get UTC time stamps
  if (!user)
    return APIError(
      res,
      HTTP.STATUS.NOT_FOUND,
      "User not found",
      HTTP.ERROR_TYPES.NOT_FOUND
    );

  // generate token and store in db with ttl
  const access_token = await generateAccessToken({ _id: user.client_id });
  const refresh_token = await generateRefreshToken({ _id: user.client_id });

  const redisTokenKey = `${REDIS_KEY.TOKEN}:${encryptedEmail}`;
  await Redis.SET(redisTokenKey, JSON.stringify(refresh_token), {
    EX: 7 * 24 * 60 * 60,
  });

  return res
    .status(HTTP.STATUS.OK)
    .cookie("_refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "You are logged in successfully",
      data: {
        token: access_token,
      },
    });
});

export const logout = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const encryptedEmail = EncryptData(email);
  const key = `${REDIS_KEY.TOKEN}:${encryptedEmail}`;
  const result = await Redis.del(key);
  if (result === 0) {
    return APIError(
      res,
      HTTP.STATUS.NOT_FOUND,
      "No active session found.",
      HTTP.ERROR_TYPES.DATABASE_ERROR
    );
  }

  return APIResponse(res, HTTP.STATUS.OK, "Logout successfully");
});

export const getNewAccessToken = CatchAsyncError(async (req, res, next) => {
  // check refresh token actually exist inside cookie
  // const authHeader = req.headers.authorization;
  // const refresh_token = authHeader.split(" ")[1];
  const refresh_token = req.cookies?._refresh_token;
  console.log(refresh_token);

  if (!refresh_token)
    return APIError(
      res,
      HTTP.STATUS.FORBIDDEN,
      "Invalid refresh token",
      HTTP.ERROR_TYPES.FORBIDDEN
    );

  // validate refresh token
  const decode = await validateRefreshToken(refresh_token);
  // find user
  const user = await User.findOne({ client_id: decode._id });
  if (!user)
    return APIError(
      res,
      HTTP.STATUS.NOT_FOUND,
      "Invalid token",
      HTTP.ERROR_TYPES.NOT_FOUND
    );

  // if refresh token is still valid then generate new access token and send inside response
  const access_token = await generateAccessToken({ _id: user.client_id });

  return APIResponse(res, HTTP.STATUS.OK, "Here is access token", {
    token: access_token,
  });
});
