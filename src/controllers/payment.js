import * as paymentService from "../services/payment.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addPayment = async (req, res, next) => {
  const paymentData = await paymentService.addPayment(req, res, next);
  res.status(statusCodes?.created).send(paymentData);
};

const getAllPayments = async (req, res, next) => {
  const payments = await paymentService.getAllPayments(req, res, next);
  res.status(statusCodes?.ok).send(payments);
};

const getPaymentById = async (req, res, next) => {
  const payment = await paymentService.getPaymentById(req.params.id, next);
  if (!payment) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(payment);
};

const updatePayment = async (req, res, next) => {
  const updatedPayment = await paymentService.updatePayment(
    req.params.id,
    req.body,
    next
  );
  if (!updatedPayment) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res
    .status(statusCodes?.ok)
    .send({ message: Message?.updateSuccess, updatedPayment });
};

const deletePayment = async (req, res, next) => {
  const deletedPayment = await paymentService.deletePayment(
    req.params.id,
    next
  );
  if (!deletedPayment) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send({ message: Message?.deleteSuccess });
};

const getPaymentsByCustomerId = async (req, res, next) => {
  const { customerId } = req.params;
  const payments = await paymentService.getPaymentsByCustomerId(customerId);
  if (!payments) {
    throw new CustomError(
      statusCodes?.notFound,
      "Payments not found for this customer.",
      errorCodes?.not_found
    );
  }
  res.status(statusCodes?.ok).send(payments);
};

const getPaymentsByInventoryId = async (req, res, next) => {
  const { inventoryId } = req.params;
  const payments = await paymentService.getPaymentsByInventoryId(inventoryId);
  if (!payments) {
    throw new CustomError(
      statusCodes?.notFound,
      "Payments not found for this inventory.",
      errorCodes?.not_found
    );
  }
  res.status(statusCodes?.ok).send(payments);
};

export default {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsByInventoryId,
  getPaymentsByCustomerId,
};
