import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import customerController from "../controllers/customer.js";
const customerRoutes = Router();

customerRoutes.post("/add", asyncHandler(customerController.addCustomer));
customerRoutes.get("/list", asyncHandler(customerController.getAllCustomers));
customerRoutes.get("/:id", asyncHandler(customerController.getCustomerById));
customerRoutes.put("/:id", asyncHandler(customerController.updateCustomer));
customerRoutes.delete("/:id", asyncHandler(customerController.deleteCustomer));

export default customerRoutes;
