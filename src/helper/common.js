import { Code } from "../models/code.js";

export const generateUniqueCode = async (code) => {
  try {
    const codeRecord = await Code.findOne({ code });

    const uniqueCode = `${codeRecord.code}${codeRecord.number}`;

    await Code.findOneAndUpdate(
      { code },
      { $inc: { number: 1 } },
      { new: true }
    );

    return uniqueCode;
  } catch (error) {
    console.error("Error generating unique code:", error);
    throw error;
  }
};
