import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import reportsController from "../controllers/reports.js";

const reportsRoutes = Router();

reportsRoutes.get(
  "/inventory",
  asyncHandler(reportsController.getInventoryReport),
);
reportsRoutes.get(
  "/inventory/:start_date/:end_date",
  asyncHandler(reportsController.getInventoryReportByDate),
);
reportsRoutes.get("/loan", asyncHandler(reportsController.getLoanReport));
reportsRoutes.get("/payment", asyncHandler(reportsController.getPaymentReport));
reportsRoutes.get(
  "/loan/:start_date/:end_date",
  asyncHandler(reportsController.getLoanReportByDate),
);
reportsRoutes.get("/all", asyncHandler(reportsController.getInventoryallReport))
reportsRoutes.get("/customer/:id", asyncHandler(reportsController.getCustomerInventoryData))


export default reportsRoutes;
