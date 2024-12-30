import mongoose, { Schema } from "mongoose";

const inventrySchema = new Schema(
  {
    lot_number: {
      type: Number,
      trim: true,
      default:null
    },
    qty: {
      type: Number,
      required: true,
      trim: true,
    },
    driver_name: {
      type: String,
    },
    vechile_no: {
      type: String,
    },
    weight: {
      type: Number,
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
      default:''
    },
    inventory_desc: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
    additional_expense: {
      type: Number
    },
    package_weight: {
      type: Number
    },
    loan_applicable_bags: {
      type: Number
    },
    loan_applicable_qty: {
      type: Number
    }
  },
  { timestamps: true },
);

export const Inventry = mongoose.model("inventry", inventrySchema);
