import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["store", "remove"],
    },
    status: {
      type: String,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    remaining_qty: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    applicable_amount:{
      type : Number ,
      default : null
    },
    paid_amount:{
      type : Number ,
      default : null
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
  { timestamps: true },
);

export const Transaction = mongoose.model("transaction", transactionSchema);
