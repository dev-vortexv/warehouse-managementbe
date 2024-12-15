import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import inventoryController from "../controllers/inventry.js";
const inventoryRoutes = Router();

inventoryRoutes.post("/add", asyncHandler(inventoryController.addInventory));
inventoryRoutes.get("/list", asyncHandler(inventoryController.getAllInventory));
inventoryRoutes.get("/:id", asyncHandler(inventoryController.getInventoryById));
inventoryRoutes.put("/:id", asyncHandler(inventoryController.updateInventory));
inventoryRoutes.delete(
  "/:id",
  asyncHandler(inventoryController.deleteInventory),
);

export default inventoryRoutes;
