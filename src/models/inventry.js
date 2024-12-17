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
      default: null,
    },
    start_date: {
      type: Date,
      required: true,
    },
    is_loan: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "category",
    },
    customer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    discount: {
      type: Number,
      default: 0,
    },
    product_name: {
      type: String,
    },
    product_desc: {
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
