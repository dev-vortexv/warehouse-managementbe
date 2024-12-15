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
    start_date: {
      type: Date,
      required: true,
      unique: true,
    },
    is_loan: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
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

export const Inventry = mongoose.model("inventry", inventrySchema);
