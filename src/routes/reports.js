import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import reportsController from "../controllers/reports.js";

const reportsRoutes = Router();

reportsRoutes.get(
  "/inventory",
  asyncHandler(reportsController.getInventoryReport)
);
reportsRoutes.get("/loan", asyncHandler(reportsController.getLoanReport));
reportsRoutes.get("/payment", asyncHandler(reportsController.getPaymentReport));

export default reportsRoutes;
