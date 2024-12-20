import mongoose from "mongoose";
import { Payment } from "../models/payment.js";
import { Inventry } from "../models/inventry.js";
import { Loan } from "../models/loan.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addPayment = async (req) => {
  const { type, status, amount, inventry, customer } = req.body;

  let inventoryDetails = null;
  let loanDetails = null;

  if (type === "inventry") {
    inventoryDetails = await Inventry.findById(inventry);
    if (!inventoryDetails) {
      throw new CustomError(
        statusCodes?.badRequest,
        "Inventory not found",
        errorCodes?.not_found
      );
    }
  } else if (type === "loan") {
    loanDetails = await Loan.findById(inventry);
    if (!loanDetails) {
      throw new CustomError(
        statusCodes?.badRequest,
        "Loan not found",
        errorCodes?.not_found
      );
    }
  }

  const payment = new Payment({
    type,
    status,
    amount,
    inventry,
    customer,
  });

  const paymentData = await payment.save();
  return paymentData;
};

export const getAllPayments = async () => {
  const payments = await Payment.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $lookup: {
        from: "inventries",
        localField: "inventry",
        foreignField: "_id",
        as: "inventryDetails",
      },
    },
    {
      $lookup: {
        from: "loans",
        localField: "inventry",
        foreignField: "inventry",
        as: "loanDetails",
      },
    },
    {
      $project: {
        "customerDetails.firstName": 1,
        "customerDetails.lastName": 1,
        amount: 1,
        status: 1,
        type: 1,
        inventryDetails: { product_name: 1, lot_number: 1 },
        loanDetails: { amount: 1, interest_percentage: 1 },
      },
    },
  ]);
  return payments;
};

export const getPaymentById = async (id) => {
  const payment = await Payment.findById(id);
  if (!payment) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }
  return payment;
};

export const updatePayment = async (id, updateData) => {
  const updatedPayment = await Payment.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedPayment) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return updatedPayment;
};

export const deletePayment = async (id) => {
  const deletedPayment = await Payment.findByIdAndDelete(id);
  if (!deletedPayment) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return {
    message: Message?.deleteSuccess,
  };
};

export const getPaymentsByCustomerId = async (customerId) => {
  const payments = await Payment.find({ customer: customerId });
  if (!payments || payments.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      "Payments not found for this customer.",
      errorCodes?.not_found
    );
  }
  return payments;
};

export const getPaymentsByInventoryId = async (inventoryId) => {
  const payments = await Payment.find({ inventry: inventoryId });
  if (!payments || payments.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      "Payments not found for this inventory.",
      errorCodes?.not_found
    );
  }
  return payments;
};
