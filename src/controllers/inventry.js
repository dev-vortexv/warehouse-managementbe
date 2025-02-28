import { Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import * as inventoryService from "../services/inventry.js";

const addInventory = async (req, res, next) => {
  const inventoryData = await inventoryService.addInventory(req, res);
  res.status(statusCodes?.created).send(inventoryData);
};

const getAllInventory = async (req, res, next) => {
  const inventory = await inventoryService.getAllInventory();
  res.status(statusCodes?.ok).send(inventory);
};

const getInventoryById = async (req, res, next) => {
  const inventory = await inventoryService.getInventoryById(req.params.id);
  if (!inventory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(inventory);
};

const updateInventory = async (req, res, next) => {
  const updatedInventory = await inventoryService.updateInventory(
    req.params.id,
    req.body,
  );
  if (!updatedInventory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res
    .status(statusCodes?.ok)
    .send({ message: Message?.updateSuccess, updatedInventory });
};

const deleteInventory = async (req, res, next) => {
  const deletedInventory = await inventoryService.deleteInventory(
    req.params.id,
  );
  if (!deletedInventory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send({ message: Message?.deleteSuccess });
};

const getInventoryByCustomerId = async (req, res, next) => {
  const inventory = await inventoryService.getInventoryCustomerById(
    req?.params?.id,
  );
  if (!inventory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(inventory);
};

const generateInvoice = async (req, res, next) => {
  const inventory = await inventoryService.generateInvoice(
    req.params.id,
    res,
    next,
  );
  if (!inventory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.sendFile(inventory, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error sending file.");
    } else {
      console.log("File sent successfully!");
    }
  });
  // res.status(statusCodes?.ok).sendFile(inventory);
};

export default {
  addInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  getInventoryByCustomerId,
  generateInvoice,
};
