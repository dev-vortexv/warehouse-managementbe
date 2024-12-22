import { Loan } from "../models/loan.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { generateUniqueCode } from "../helper/common.js";

export const addLoan = async (req) => {
  const {
    duration_in_month,
    start_date,
    status,
    interest_percentage,
    amount,
    inventry,
    customer,
  } = req.body;
  let date = start_date ? start_date : new Date();
  let loanCode = await generateUniqueCode("LOAN");
  const loan = new Loan({
    duration_in_month,
    start_date: date,
    status,
    interest_percentage,
    amount,
    inventry,
    customer,
    loanCode
  });
  const loanData = await loan.save();
  return loanData;
};

export const getAllLoans = async () => {
  const loans = await Loan.find()
    .select("-__v")
    .populate(["customer", "inventry"]);
  return loans;
};

export const getLoanById = async (id) => {
  const loan = await Loan.findById(id)
    .select("-__v")
    .populate(["customer", "inventry"]);
  if (!loan) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return loan;
};

export const updateLoan = async (id) => {
  const updatedLoan = await Loan.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedLoan) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return updatedLoan;
};

export const markLoanAsCompleted = async (id) => {
  let status = "Completed";
  let end_date = new Date();
  const updatedLoan = await Loan.findByIdAndUpdate(
    id,
    { end_date, status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedLoan) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return updatedLoan;
};

export const deleteLoan = async (id) => {
  const deletedLoan = await Loan.findByIdAndDelete(id);
  if (!deletedLoan) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return { message: Message?.deleteSuccess };
};

export const generateInvoice = async (id) => {
  const loan = await Loan.findById(id)
    .select("-__v")
    .populate(["customer", "inventry"]);
  if (!loan) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return true;
  //   const invoicePath = await generateInvoicePDF(loan);
  return loan;
};
