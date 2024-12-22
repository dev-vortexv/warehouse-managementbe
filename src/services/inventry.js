import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { Inventry } from "../models/inventry.js";
import mongoose from "mongoose";
import { Customer } from "../models/customer.js";
import { generateInvoicePDF } from "../helper/pdfMaker.js";

export const addInventory = async (req) => {
  const {
    lot_number,
    qty,
    start_date,
    is_loan,
    rate,
    rate_category,
    customer,
    inventory_name,
    inventory_desc,
  } = req.body;
  const isInventoryExist = await Inventry.findOne({ lot_number });
  if (isInventoryExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.lot_alrready_exist,
      errorCodes?.lot_alrready_exist
    );
  }
  let date = start_date ?? new Date();

  const inventory = new Inventry({
    lot_number,
    qty,
    start_date: date,
    is_loan,
    rate,
    rate_category,
    customer,
    inventory_name,
    inventory_desc,
  });

  const inventoryData = await inventory.save();
  return inventoryData;
};

export const getAllInventory = async () => {
  const inventory = await Inventry.find()
    .select("-__v")
    .populate(["customer", "category"]);
  return inventory;
};

export const getInventoryById = async (id) => {
  const inventory = await Inventry.findById(id)
    .select("-__v")
    .populate(["customer", "category"]);
  if (!inventory) {
    return {};
  }
  return inventory;
};

export const getInventoryCustomerById = async (customerId) => {
  const whereCondition = { customer: new mongoose.Types.ObjectId(customerId) };
  return await Inventry.find(whereCondition)
    .select("-__v")
    .populate(["customer", "category"]);
};

export const updateInventory = async (id, updateData) => {
  const updatedInventory = await Inventry.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!updatedInventory) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return updatedInventory;
};

export const deleteInventory = async (id) => {
  const deletedInventory = await Inventry.findByIdAndDelete(id);
  if (!deletedInventory) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return { message: Message?.deleteSuccess };
};

export const generateInvoice = async (id) => {
  const inventory = await Inventry.findById(id)
    .select("-__v")
    .populate(["customer"]);
  if (!loan) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  const invoicePath = await generateInvoicePDF(inventory);
  return loan;
};
