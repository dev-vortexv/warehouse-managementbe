import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["inventry", "loan"],
    },
    status: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
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

export const Payment = mongoose.model("payment", paymentSchema);
