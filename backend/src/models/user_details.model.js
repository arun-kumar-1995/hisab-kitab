import { Schema, model, Types } from "mongoose";
import {
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
    user_address: {
      type: Types.ObjectId,
      ref: "user_address",
    },
  },
  { timestamps: true }
);

export const UserDetails = model("user_detail", schema);
