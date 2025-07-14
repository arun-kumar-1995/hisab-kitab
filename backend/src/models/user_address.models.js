import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    address: {
      type: String,
      trim: true
    },
    landmark: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    district: {
      type: String,
      trim: true
    },
    pincode: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const UserAddress = model("user_addres", schema);
