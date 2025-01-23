import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { Inventry } from "../models/inventry.js";
import mongoose from "mongoose";
import { Customer } from "../models/customer.js";
import { generateInventryInvoicePDF } from "../helper/pdfMaker.js";

export const addInventory = async (req, res) => {
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
    driver_name,
    vechile_no,
    weight,
    discount,
    active,
    additional_expense,
    package_weight,
    loan_applicable_bags,
    loan_applicable_qty

  } = req.body;
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
    remaining_qty: qty,
    inventory_desc,
    driver_name,
    vechile_no,
    weight,
    discount,
    active,
    additional_expense,
    package_weight,
    loan_applicable_bags,
    loan_applicable_qty
  });

  const inventoryData = await inventory.save()
  return inventoryData;
};

export const getAllInventory = async () => {
  const inventory = await Inventry.find()
    .select("-__v")
    .populate(["customer"])
    .sort({ createdAt: -1 });
  return inventory;
};


export const getInventoryById = async (id) => {
  const inventory = await Inventry.findById(id)
    .select("-__v")
    .populate(["customer", "category"]).sort({ _id: -1 });;
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
      errorCodes?.not_found,
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
      errorCodes?.not_found,
    );
  }

  return { message: Message?.deleteSuccess };
};

export const generateInvoice = async (id, res, next) => {
  const inventory = await Inventry.findById(id)
    .select("-__v")
    .populate(["customer"]);
  if (!inventory) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  const invoicePath = await generateInventryInvoicePDF(inventory, res);
  return invoicePath;
};
