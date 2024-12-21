import * as customerService from "../services/customer.js"; // Assuming you have a customer service module
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addCustomer = async (req, res, next) => {
  const customerData = await customerService.addCustomer(req, res, next);
  res.status(statusCodes?.created).send(customerData);
};

const getAllCustomers = async (req, res, next) => {
  const customers = await customerService.getAllCustomers(req, res, next);
  res.status(statusCodes?.ok).send(customers);
};

const getCustomerById = async (req, res, next) => {
  const customer = await customerService.getCustomerById(req.params.id, next);
  if (!customer) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(customer);
};

const updateCustomer = async (req, res, next) => {
  const updatedCustomer = await customerService.updateCustomer(
    req.params.id,
    req.body,
    next
  );
  if (!updatedCustomer) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res
    .status(statusCodes?.ok)
    .send({ message: Message?.updateSuccess, updatedCustomer });
};

const deleteCustomer = async (req, res, next) => {
  const deletedCustomer = await customerService.deleteCustomer(
    req.params.id,
    next
  );
  if (!deletedCustomer) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send({ message: Message?.deleteSuccess });
};

const getInventoryAndCustomerDetails = async (req, res, next) => {
  const inventory = await customerService.getInventoryAndCustomerDetails(
    req?.query
  );
  if (!inventory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(inventory);
};

export default {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getInventoryAndCustomerDetails,
};
