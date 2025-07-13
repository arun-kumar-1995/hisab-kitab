const REDIS_OTP_KEY = process.env.REDIS_KEY + ":" + "otp";
const REDIS_USERS_KEY = process.env.REDIS_KEY + ":" + "users";
const REDIS_TOKENS = process.env.REDIS_KEY + ":" + "token";

export const REDIS_KEY = {
  OTP: REDIS_OTP_KEY,
  USERS: REDIS_USERS_KEY,
  TOKEN: REDIS_TOKENS,
};
