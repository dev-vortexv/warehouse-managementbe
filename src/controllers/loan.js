import * as loanService from "../services/loan.js";
import { Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

const addLoan = async (req, res, next) => {
  const loanData = await loanService.addLoan(req, res, next);
  res.status(statusCodes?.created).send(loanData);
};

const getAllLoans = async (req, res, next) => {
  const loans = await loanService.getAllLoans(req, res, next);
  res.status(statusCodes?.ok).send(loans);
};

const getLoanById = async (req, res, next) => {
  const loan = await loanService.getLoanById(req.params.id, next);
  if (!loan) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(loan);
};

const updateLoan = async (req, res, next) => {
  const updatedLoan = await loanService.updateLoan(
    req.params.id,
    req.body,
    next
  );
  if (!updatedLoan) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res
    .status(statusCodes?.ok)
    .send({ message: Message?.updateSuccess, updatedLoan });
};

const markLoanAsCompleted = async (req, res, next) => {
  const updatedLoan = await loanService.markLoanAsCompleted(
    req.params.id,
    req.body,
    next
  );
  if (!updatedLoan) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res
    .status(statusCodes?.ok)
    .send({ message: Message?.updateSuccess, updatedLoan });
};

const deleteLoan = async (req, res, next) => {
  const deletedLoan = await loanService.deleteLoan(req.params.id, next);
  if (!deletedLoan) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send({ message: Message?.deleteSuccess });
};

export default {
  addLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
  markLoanAsCompleted,
};
