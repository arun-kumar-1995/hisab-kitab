import Joi from "joi";
import { REGEX } from "../constants/regex.constants.js";
import { FIELD } from "./fields.validation.js";

const complete_profile = Joi.object({
  cid: FIELD.CLIENT_ID,  
  
  address: Joi.string().required().label("Address").messages({
    "any.required": `{#label} is required`,
    "string.base": `{#label} must be a string`,
    "string.empty": `{#label} is required`,
  }),

  landmark: Joi.string().optional().allow("").label("Landmark").messages({
    "string.base": `{#label} must be a string`,
  }),

  district: Joi.string().required().label("District").messages({
    "any.required": `{#label} is required`,
    "string.base": `{#label} must be a string`,
    "string.empty": `{#label} is required`,
  }),

  pincode: Joi.string()
    .required()
    .pattern(REGEX.PINCODE)
    .label("Pincode")
    .messages({
      "any.required": `{#label} is required`,
      "string.pattern.base": `{#label} must be 6 digit`,
      "string.empty": `{#label} is required`,
    }),
});

export const USER_VALIDATION = {
  COMPLETE_PROFILE: complete_profile,
};
