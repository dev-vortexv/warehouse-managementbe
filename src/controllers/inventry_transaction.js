import * as transactionService from "../services/inventry_transaction.js";
import { Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

const addTransaction = async (req, res, next) => {
  console.log("req==========", req?.body);
  const transactionData = await transactionService.addTransaction(
    req,
    res,
    next,
  );
  res.status(statusCodes?.created).send(transactionData);
};

const getAllTransactions = async (req, res, next) => {
  const transactions = await transactionService.getAllTransactions(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(transactions);
};

const getTransactionById = async (req, res, next) => {
  const transaction = await transactionService.getTransactionById(
    req.params.id,
    next,
  );
  if (!transaction) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(transaction);
};

const updateTransaction = async (req, res, next) => {
  const updatedTransaction = await transactionService.updateTransaction(
    req.params.id,
    req.body,
    next,
  );
  if (!updatedTransaction) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res
    .status(statusCodes?.ok)
    .send({ message: Message?.updateSuccess, updatedTransaction });
};

const deleteTransaction = async (req, res, next) => {
  const deletedTransaction = await transactionService.deleteTransaction(
    req.params.id,
    next,
  );
  if (!deletedTransaction) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send({ message: Message?.deleteSuccess });
};

const getTransactionsByInventory = async (req, res, next) => {
  const { inventoryId } = req.params;
  const transactions =
    await transactionService.getTransactionsByInventory(inventoryId);
  if (!transactions || transactions.length === 0) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(transactions);
};

const getTransactionsByCustomer = async (req, res, next) => {
  const { customerId } = req.params;
  const transactions =
    await transactionService.getTransactionsByCustomer(customerId);
  if (!transactions || transactions.length === 0) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(transactions);
};

const getTransactionsByCustomerAndInventory = async (req, res, next) => {
  const { customerId, inventoryId } = req.params;
  const transactions =
    await transactionService.getTransactionsByCustomerAndInventory(
      customerId,
      inventoryId,
    );
  if (!transactions || transactions.length === 0) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(transactions);
};

export default {
  addTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionsByInventory,
  getTransactionsByCustomer,
  getTransactionsByCustomerAndInventory,
};
