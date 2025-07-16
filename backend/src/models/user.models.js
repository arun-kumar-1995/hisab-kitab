import { Schema, Types, model } from "mongoose";
import { GENDER_VALUES } from "../constants/enums.constants.js";

const schema = new Schema(
  {
    client_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select:false
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
    profile_image: {
      image_url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    last_logged_in: {
      type: Date,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    user_details: {
      type: Types.ObjectId,
      ref: "user_details",
    },
    account: {
      type: Types.ObjectId,
      ref: "accounts",
    },
  },
  { timestamps: true }
);

export const User = model("user", schema);
