import { Transaction } from "../models/inventry_transaction.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { Inventry } from "../models/inventry.js";

export const addTransaction = async (req) => {
  const { type, status, qty, inventry, customer, active } = req.body;

  console.log("req.body", req?.body);

  const transaction = new Transaction({
    type,
    status,
    qty,
    inventry,
    customer,
    active,
  });

  const transactionData = await transaction.save();

  if (type === "remove") {
    await Inventry.findOneAndUpdate(
      { _id: inventry },
      { $inc: { remaining_qty: 10 } },
      { new: true }
    );
  }
  return transactionData;
};

export const getAllTransactions = async () => {
  const transactions = await Transaction.find()
    .populate("inventry customer")
    .select("-__v");
  return transactions;
};

export const getTransactionById = async (id) => {
  const transaction = await Transaction.findById(id)
    .populate("inventry customer")
    .select("-__v");
  if (!transaction) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }
  return transaction;
};

export const updateTransaction = async (id, updateData) => {
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("inventry customer")
    .select("-__v");

  if (!updatedTransaction) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return updatedTransaction;
};

export const deleteTransaction = async (id) => {
  const deletedTransaction = await Transaction.findByIdAndDelete(id);
  if (!deletedTransaction) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return { message: Message?.deleteSuccess };
};

// New Service Methods

export const getTransactionsByInventory = async (inventoryId) => {
  const transactions = await Transaction.find({ inventry: inventoryId })
    .populate("inventry customer")
    .select("-__v");
  if (!transactions || transactions.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }
  return transactions;
};

export const getTransactionsByCustomer = async (customerId) => {
  const transactions = await Transaction.find({ customer: customerId })
    .populate("inventry customer")
    .select("-__v");
  if (!transactions || transactions.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }
  return transactions;
};

export const getTransactionsByCustomerAndInventory = async (
  customerId,
  inventoryId
) => {
  const transactions = await Transaction.find({
    customer: customerId,
    inventry: inventoryId,
  })
    .populate("inventry customer")
    .select("-__v");
  if (!transactions || transactions.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }
  return transactions;
};
