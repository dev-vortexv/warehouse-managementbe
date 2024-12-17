import mongoose, { Schema } from "mongoose";

const loanSchema = new Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      trim: true,
    },
    interest_percentage: {
      type: Date,
      required: true,
    },
    amount: {
      type: Boolean,
      default: false,
    },
    inventry: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Loan = mongoose.model("loan", loanSchema);
