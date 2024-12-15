import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { Inventry } from "../models/inventry.js";

export const addInventory = async (req) => {
  const { lot_number, qty, start_date, is_loan, category } = req.body;

  const isInventoryExist = await Inventry.findOne({ lot_number });
  if (isInventoryExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.lot_alrready_exist,
      errorCodes?.lot_alrready_exist,
    );
  }

  const inventory = new Inventry({
    lot_number,
    qty,
    start_date,
    is_loan,
    category,
  });

  const inventoryData = await inventory.save();
  return inventoryData;
};

export const getAllInventory = async () => {
  const inventory = await Inventry.find().select("-__v");
  return inventory;
};

export const getInventoryById = async (id) => {
  const inventory = await Inventry.findById(id).select("-__v");
  if (!inventory) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return inventory;
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
