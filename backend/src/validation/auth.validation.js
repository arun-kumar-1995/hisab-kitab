import Joi from "joi";
import { FIELD } from "./fields.validation.js";

const VERIFY_EMAIL = Joi.object({
  email: FIELD.EMAIL,
  otp: FIELD.OTP,
});

const VERIFY_PHONE = Joi.object({
  phone: FIELD.PHONE,
  country_code: FIELD.COUNTRY_CODE,
  otp: FIELD.OTP,
});

const SIGNUP_REQUEST = Joi.object({
  cid: FIELD.CLIENT_ID,
  first_name: FIELD.FIRST_NAME,
  last_name: FIELD.LAST_NAME,
  email: FIELD.EMAIL,
  isEmailVerified: FIELD.IS_EMAIL_VERIFIED,
  gender: FIELD.GENDER,
  phone: FIELD.PHONE,
  country: FIELD.COUNTRY,
  country_code: FIELD.COUNTRY_CODE,
  isPhoneVerified: FIELD.IS_PHONE_VERIFIED,
  password: FIELD.PASSWORD,
  user_type: FIELD.USER_TYPE,
  sub_role: FIELD.SUB_ROLE,
  isActive: FIELD.IS_ACTIVE,
  account_status: FIELD.ACCOUNT_STATUS,
  isAccountVerified: FIELD.IS_ACCOUNT_VERIFIED,
  last_logged_in: FIELD.LAST_LOGGED_IN,
  state: FIELD.STATE,
});

const LOGIN_REQUEST = Joi.object({
  email: FIELD.EMAIL,
  password: FIELD.PASSWORD,
});

const LOGOUT_REQUEST = Joi.object({
  email: FIELD.EMAIL,
});

const SEND_OTP = Joi.object({
  email: FIELD.EMAIL,
});

const CLIENT_ID = Joi.object({
  cid: FIELD.CLIENT_ID,
});

export const AUTH_VALIDATION = {
  SEND_OTP: SEND_OTP,
  PHONE: FIELD.PHONE,
  SIGNUP: SIGNUP_REQUEST,
  LOGIN: LOGIN_REQUEST,
  VERIFY_EMAIL: VERIFY_EMAIL,
  VERIFY_PHONE: VERIFY_PHONE,
  LOGOUT: LOGOUT_REQUEST,
  CLIENT_ID: CLIENT_ID,
};
