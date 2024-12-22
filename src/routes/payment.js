import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import paymentController from "../controllers/payment.js";

const paymentRoutes = Router();

paymentRoutes.post("/add", asyncHandler(paymentController.addPayment));
paymentRoutes.get("/list", asyncHandler(paymentController.getAllPayments));
paymentRoutes.get("/:id", asyncHandler(paymentController.getPaymentById));
paymentRoutes.put("/:id", asyncHandler(paymentController.updatePayment));
paymentRoutes.delete("/:id", asyncHandler(paymentController.deletePayment));

paymentRoutes.get(
  "/customer/:customerId",
  asyncHandler(paymentController.getPaymentsByCustomerId),
);
paymentRoutes.get(
  "/inventory/:inventoryId",
  asyncHandler(paymentController.getPaymentsByInventoryId),
);

export default paymentRoutes;
