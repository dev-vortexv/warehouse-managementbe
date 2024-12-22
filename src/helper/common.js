import { Code } from "../models/code.js";

export const generateUniqueCode = async (code) => {
  try {
    const codeRecord = await Code.findOne({ code });
    const uniqueCode = `${codeRecord.code}${codeRecord.number}`;
    await Code.findOneAndUpdate(
      { code },
      { $inc: { number: 1 } },
      { new: true },
    );
    return uniqueCode;
  } catch (error) {
    console.error("Error generating unique code:", error);
    throw error;
  }
};


export const insertCodeData = async () => {
  const existingCustomerRecord = await Code.findOne({ code: "CUST" });

  if (!existingCustomerRecord) {
    const codeRecord = new Code({
      name: "Customer",
      code: "CUST",
      number: 1,
    });

    await codeRecord.save();
  }

  const existingLoandRecord = await Code.findOne({ code: "LOAN" });

  if (!existingLoandRecord) {
    const codeRecord = new Code({
      name: "Loan",
      code: "LOAN",
      number: 1,
    });

    await codeRecord.save();
  }
};
