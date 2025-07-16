import { Schema, Types, model } from "mongoose";
import {
  ACCOUNT_STATUS_VALUES,
  SUB_ROLE_VALUES,
  USER_TYPES_VALUE,
} from "../constants/enums.constants.js";

const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "user",
    },
    client_id: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
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
  },
  { timestamps: true }
);

export const Account = model("account", schema);
