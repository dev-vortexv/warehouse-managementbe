import { Customer } from "../models/customer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { generateUniqueCode } from "../helper/common.js";

export const addCustomer = async (req) => {
  const {
    firstName,
    lastName,
    phoneNo,
    email,
    country,
    address,
    IdentityNo,
    IdentityType,
  } = req.body;
  if (email) {
    const isCustomerAlreadyExist = await Customer.findOne({ email });
    if (isCustomerAlreadyExist) {
      throw new CustomError(
        statusCodes?.conflict,
        Message?.alreadyExist,
        errorCodes?.already_exist,
      );
    }
  }
  const customerCode = await generateUniqueCode("CUST");
  const customer = new Customer({
    customerCode,
    firstName,
    lastName,
    phoneNo,
    email,
    country,
    address,
    IdentityType,
    IdentityNo,
  });
  const customerData = await customer.save();
  return customerData;
};

export const getAllCustomers = async () => {
  const customers = await Customer.find().select("-__v");
  return customers;
};

export const getCustomerById = async (id) => {
  const customer = await Customer.findById(id).select("-__v");
  if (!customer) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return customer;
};

export const updateCustomer = async (id, updateData) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!updatedCustomer) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return updatedCustomer;
};

export const deleteCustomer = async (id) => {
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  if (!deletedCustomer) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deleteSuccess,
  };
};

export const getInventoryAndCustomerDetails = async (data) => {
  const { customerId, inventryId } = data;
  const whereCondition = { customer: new mongoose.Types.ObjectId(customerId) };
  return await Customer.find(whereCondition)
    .select("-__v")
    .populate("inventry");
};
