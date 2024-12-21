import mongoose, { Schema } from "mongoose";

const loanSchema = new Schema(
  {
    duration_in_month: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    interest_percentage: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      default: false,
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
