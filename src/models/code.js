import mongoose, { Schema } from "mongoose";

const codeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      // unique: true,
    },
  },
  { timestamps: true },
);

export const Code = mongoose.model("Code", codeSchema);
