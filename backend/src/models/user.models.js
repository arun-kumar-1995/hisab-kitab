import { Schema, Types, model } from "mongoose";
import {
  ACCOUNT_STATUS_VALUES,
  GENDER_VALUES,
  SUB_ROLE_VALUES,
  USER_TYPES_VALUE,
} from "../constants/enums.constants.js";

const schema = new Schema(
  {
    client_id: {
      type: String,
      required: true,
      trim: true,
    },
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: GENDER_VALUES,
    },
    phone: {
      type: Number,
    },
    country: {
      type: String,
      default: "India",
    },
    country_code: {
      type: String,
      default: "+91",
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    profile_image: {
      image_url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    user_type: {
      type: String,
      enum: USER_TYPES_VALUE,
      default: "Customer",
    },
    sub_role: {
      type: String,
      enum: SUB_ROLE_VALUES,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    account_status: {
      type: String,
      enum: ACCOUNT_STATUS_VALUES,
      default: "pending",
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    last_logged_in: {
      type: Date,
    },
    user_address: {
      type: Types.ObjectId,
      ref: "user_address",
      required: true
    },
  },
  { timestamps: true }
);

export const User = model("user", schema);
