import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import inventoryController from "../controllers/inventry.js";
const inventoryRoutes = Router();

inventoryRoutes.post("/add", asyncHandler(inventoryController.addInventory));
inventoryRoutes.get("/list", asyncHandler(inventoryController.getAllInventory));
inventoryRoutes.get("/:id", asyncHandler(inventoryController.getInventoryById));
inventoryRoutes.get(
  "/bycustomer/:id",
  asyncHandler(inventoryController.getInventoryByCustomerId),
);
inventoryRoutes.get(
  "/customer/inventry-details",
  asyncHandler(inventoryController.getInventoryAndCustomerDetails),
);
inventoryRoutes.put("/:id", asyncHandler(inventoryController.updateInventory));
inventoryRoutes.delete(
  "/:id",
  asyncHandler(inventoryController.deleteInventory),
);
inventoryRoutes.get(
  "/invoice/:id",
  asyncHandler(inventoryController.generateInvoice),
);

export default inventoryRoutes;
