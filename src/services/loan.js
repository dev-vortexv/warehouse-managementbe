import { Loan } from "../models/loan.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addLoan = async (req) => {
  const {
    duration_in_month,
    status,
    interest_percentage,
    amount,
    inventry,
    customer,
    active,
  } = req.body;
  const loan = new Loan({
    duration_in_month,
    status,
    interest_percentage,
    amount,
    inventry,
    customer,
    active,
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

export const updateLoan = async (id, updateData) => {
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
