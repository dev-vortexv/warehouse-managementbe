import mongoose, { Schema } from "mongoose";

const loanSchema = new Schema(
  {
    loanCode: {
      type: String,
    },
    expected_duration_in_month: {
      type: Number,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    status: {
      type: String,
    },
    interest_percentage: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    inventry: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "inventry",
    },
    customer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    applicable_bags: {
      type: Number,
    },
    applicable_qty: {
      type: Number
    },
    applicable_valuation: {
      type: Number
    },
    applicable_percentage_on_valuation: {
      type: Number
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Loan = mongoose.model("loan", loanSchema);
