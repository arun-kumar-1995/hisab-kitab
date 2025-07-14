import { Redis } from "../configs/redis.config.js";
import { USER_TYPES } from "../constants/enums.constants.js";
import { HTTP } from "../constants/http.constants.js";
import { REDIS_KEY } from "../constants/redis_keys.constants.js";
import { CatchAsyncError } from "../middleware/error.middleware.js";
import { User } from "../models/user.models.js";
import { UserAddress } from "../models/user_address.models.js";
import { APIError, APIResponse } from "../utils/api_response.utils.js";
import { GetCurrentUTCTime } from "../utils/date_time.utils.js";
import { GenerateToken } from "../utils/jwt_token.utils.js";
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
  console.log(otp);

  // store in redis with expiry of 5 min
  await Redis.SET(cachedKey, JSON.stringify(otp), { EX: 300 });

  // send otp on email with email template

  // send response
  return APIResponse(res, HTTP.STATUS.OK, "OTP send to email :" + email);
});

export const verifyEmail = CatchAsyncError(async (req, res, next) => {
  let { email, otp } = req.body;
  //   check if key exists if not otp expired
  const cachedKey = REDIS_KEY.OTP + ":" + email;
  // check for valid otp
  const value = await Redis.GET(cachedKey);
  if (!value)
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "Otp Expired",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  if (value !== otp)
    return APIError(
      res,
      HTTP.STATUS.BAD_REQUEST,
      "Invalid Otp",
      HTTP.ERROR_TYPES.BAD_REQUEST
    );

  // send response
  return APIResponse(res, HTTP.STATUS.OK, "Email has been verified", {
    isEmailVerified: true,
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
  const token = await GenerateToken({ _id: user.client_id });
  const redisTokenKey = `${REDIS_KEY.TOKEN}:${encryptedEmail}`;
  await Redis.SET(redisTokenKey, JSON.stringify(token), {
    EX: 1 * 24 * 60 * 60,
  });

  return APIResponse(res, HTTP.STATUS.OK, "You are logged in successfully", {
    token,
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
