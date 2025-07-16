import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    user_details: {
      type: Types.ObjectId,
      ref: "user_details",
    },
    client_id: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      lowercase: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      trim: true,
      lowercase: true,
    },
    district: {
      type: String,
      trim: true,
      lowercase: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const UserAddress = model("user_addres", schema);
