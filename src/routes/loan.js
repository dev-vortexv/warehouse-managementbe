import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import loanController from "../controllers/loan.js";

const loanRoutes = Router();

loanRoutes.post("/add", asyncHandler(loanController.addLoan));
loanRoutes.get("/list", asyncHandler(loanController.getAllLoans));
loanRoutes.get("/:id", asyncHandler(loanController.getLoanById));
loanRoutes.put("/:id", asyncHandler(loanController.updateLoan));
loanRoutes.put(
  "/:id/complete",
  asyncHandler(loanController.markLoanAsCompleted),
);
loanRoutes.delete("/:id", asyncHandler(loanController.deleteLoan));
loanRoutes.get("/invoice/:id", asyncHandler(loanController.generateInvoice));

export default loanRoutes;
