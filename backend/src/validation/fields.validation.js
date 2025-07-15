import Joi from "joi";
import { REGEX } from "../constants/regex.constants.js";
import {
  ACCOUNT_STATUS_VALUES,
  GENDER_VALUES,
  SUB_ROLE_VALUES,
  USER_TYPES_VALUE,
} from "../constants/enums.constants.js";

const client_id = Joi.string().required().label("Client Id").messages({
  "any.required": `{#label} is required`,
  "string.base": `{#label} must be string`,
  "string.empty": `{#label} is required`,
});

const first_name = Joi.string()
  .required()
  .label("First name")
  .pattern(REGEX.NAME.FIRST_NAME)
  .messages({
    "string.base": `{#label} must be string`,
    "string.pattern.base": `Invalid {#label} name`,
    "any.required": `{#label} is required`,
    "string.empty": `{#label} is required`,
  });

const last_name = Joi.string()
  .required()
  .label("Last name")
  .pattern(REGEX.NAME.LAST_NAME)
  .messages({
    "string.base": `{#label} must be string`,
    "string.pattern.base": `Invalid {#label} name`,
    "any.required": `{#label} is required`,
    "string.empty": `{#label} is required`,
  });

const email = Joi.string()
  .required()
  .label("Email address")
  .pattern(REGEX.EMAIL)
  .messages({
    "string.pattern.base": `{#label} must be a valid email address`,
    "string.empty": `{#label} is required`,
    "any.required": `{#label} is required`,
    "string.base": `{#label} must be string`,
  });

const phone = Joi.string()
  //   .required()
  .label("Phone number")
  .pattern(REGEX.PHONE)
  .messages({
    "string.pattern.base": `{#label} must be a valid phone number`,
    "string.empty": `{#label} is required`,
    // "any.required": `{#label} is required`,
    "string.base": `{#label} must be string`,
  });

const otp = Joi.string()
  .required()
  .length(6)
  .label("Opt")
  .pattern(REGEX.OTP)
  .messages({
    "string.empty": `{#label} is required`,
    "any.required": `{#label} is required`,
    "string.pattern.base": `{#label} must be 6 digit`,
    "string.length": `{#label} me be 6 digit `,
  });

const country_code = Joi.string()
  //   .required()
  .label("Country code")
  .pattern(REGEX.COUNTRY_CODE)
  .messages({
    "string.pattern.base": `{#label} must be a valid country code`,
    "string.empty": `{#label} is required"`,
    // "any.required": `{#label} is required"`,
  });
const gender = Joi.string()
  .required()
  .label("Gender")
  .valid(...GENDER_VALUES)
  .messages({
    "any.required": `{#label} is required`,
    "string.empty": `{#label} is required`,
    "string.base": `{#label} must be string`,
    "any.one": `{#label} must be one of [male, female, other]`,
  });

const isEmailVerified = Joi.boolean()
  .required()
  .label("IS Email Verified")
  .messages({
    "boolean.base": `{#label} must be true or false`,
    "any.required": `{#label} is required`,
  });

const isPhoneVerified = Joi.boolean()
  .optional()
  .label("IS Phone Verified")
  .messages({
    "boolean.base": `{#label} must be true or false`,
  });

const country = Joi.string().label("Country").optional().messages({
  "string.base": `{#label} must be string`,
});

const password = Joi.string().required().label("Password").messages({
  "string.base": `{#label} must be string`,
  "any.required": `{#label} is required`,
  "string.empty": `{#label} is required`,
});

const user_type = Joi.string()
  .required()
  .valid(...USER_TYPES_VALUE)
  .label("User Type")
  .messages({
    "any.required": `{#label} is required`,
    "string.base": `{#label} must be string`,
    "string.empty": `{#label} is required`,
    "any.only":
      "{{#label}} must be one of [" + USER_TYPES_VALUE.join(", ") + "]",
  });
const sub_role = Joi.string()
  .valid(...SUB_ROLE_VALUES)
  .label("Sub role")
  .messages({
    "string.base": `{#label} is required`,
    "string.empty": `{#label} is required`,
    "any.only":
      "{{#label}} must be one of [" + SUB_ROLE_VALUES.join(", ") + "]",
  });

const isActive = Joi.boolean().optional().label("IS Active").messages({
  "boolean.base": `{#label} must be true or false`,
});
const account_status = Joi.string()
  .label("Account Status")
  .optional()
  .valid(...ACCOUNT_STATUS_VALUES)
  .messages({
    "string.base": `{#label} must be string`,
    "any.only":
      "{{#label}} must be one of [" + ACCOUNT_STATUS_VALUES.join(",") + "]",
  });
const isAccountVerified = Joi.boolean()
  .optional()
  .label("IS Account Verified")
  .messages({
    "boolean.base": `{#label} must be true or false`,
  });
const last_logged_in = Joi.date().optional().label("Last Logged In").messages({
  "date.base": `{#label} must be a valid date`,
});

const state = Joi.string().required().label("State").messages({
  "string.base": `{#label} must be string`,
  "string.empty": `{#label} is required`,
  "any.required": `{#label} is required`,
});

export const FIELD = {
  CLIENT_ID: client_id,
  FIRST_NAME: first_name,
  LAST_NAME: last_name,
  EMAIL: email,
  PHONE: phone,
  GENDER: gender,
  OTP: otp,
  COUNTRY_CODE: country_code,
  IS_EMAIL_VERIFIED: isEmailVerified,
  IS_PHONE_VERIFIED: isPhoneVerified,
  COUNTRY: country,
  PASSWORD: password,
  USER_TYPE: user_type,
  SUB_ROLE: sub_role,
  IS_ACTIVE: isActive,
  ACCOUNT_STATUS: account_status,
  IS_ACCOUNT_VERIFIED: isAccountVerified,
  LAST_LOGGED_IN: last_logged_in,
  STATE: state,
};
