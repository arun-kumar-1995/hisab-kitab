import { Schema, Types, model } from "mongoose";
import {
  ACCOUNT_STATUS_VALUES,
  SUB_ROLE_VALUES,
  USER_TYPES_VALUE,
} from "../constants/enums.constants.js";

const schema = new Schema(
  {
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    user_type: {
      type: String,
      enum: USER_TYPES_VALUE,
      default: "customer",
      required: true,
    },
    sub_role: {
      type: String,
      enum: SUB_ROLE_VALUES,
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
  },
  { timestamps: true }
);

export const Account = model("account", schema);
