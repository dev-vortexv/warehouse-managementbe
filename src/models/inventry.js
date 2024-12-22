import mongoose, { Schema } from "mongoose";

const inventrySchema = new Schema(
  {
    lot_number: {
      type: Number,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
      trim: true,
    },
    remaining_qty: {
      type: Number,
      trim: true,
      default: 0,
    },
    start_date: {
      type: Date,
      required: true,
    },
    is_loan: {
      type: Boolean,
      default: false,
    },
    // category: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    //   ref: "category",
    // },
    customer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    rate: {
      type: Number,
      required: true,
    },
    rate_category: {
      required: true,
      type: String,
      enum: ["MONTH", "DAY", "YEAR"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    inventory_name: {
      type: String,
    },
    inventory_desc: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Inventry = mongoose.model("inventry", inventrySchema);
