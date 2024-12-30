import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    customerCode: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      default : ''
    },
    phoneNo: {
      type: String,
      unique: true,
      default : null
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      default : null
    },
    IdentityNo: {
      type: String,
      unique: true,
      default : null
    },
    IdentityType: {
      type: String,
      default : null
    },
    country: {
      type: String,
      default : null
    },
    address: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Customer = mongoose.model("customer", customerSchema);
