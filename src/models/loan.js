import mongoose, { Schema } from "mongoose";

const loanSchema = new Schema(
  {
    duration_in_month: {
      type: Number,
      required: false,
    },
    start_date: {
      type: Date,
      required: true,
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Loan = mongoose.model("loan", loanSchema);
