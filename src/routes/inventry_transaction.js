import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import transactionController from "../controllers/inventry_transaction.js";

const transactionRoutes = Router();
transactionRoutes.post(
  "/add",
  asyncHandler(transactionController.addTransaction),
);
transactionRoutes.get(
  "/list",
  asyncHandler(transactionController.getAllTransactions),
);
transactionRoutes.get(
  "/:id",
  asyncHandler(transactionController.getTransactionById),
);
transactionRoutes.put(
  "/:id",
  asyncHandler(transactionController.updateTransaction),
);
transactionRoutes.delete(
  "/:id",
  asyncHandler(transactionController.deleteTransaction),
);

transactionRoutes.get(
  "/inventory/:inventoryId",
  asyncHandler(transactionController.getTransactionsByInventory),
);
transactionRoutes.get(
  "/customer/:customerId",
  asyncHandler(transactionController.getTransactionsByCustomer),
);
transactionRoutes.get(
  "/customer-inventory/:customerId/:inventoryId",
  asyncHandler(transactionController.getTransactionsByCustomerAndInventory),
);

export default transactionRoutes;
