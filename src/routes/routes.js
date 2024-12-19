import express from "express";
import customerRoutes from "./customer.js";
import inventoryRoutes from "./inventry.js";
import categoryRoutes from "./category.js";
import loanRoutes from "./loan.js";
import transactionRoutes from "./inventry_transaction.js";

const router = express.Router();
router.use("/customer", customerRoutes);
router.use("/inventry", inventoryRoutes);
router.use("/category", categoryRoutes);
router.use("/loan", loanRoutes);
router.use("/transaction", transactionRoutes);

export default router;
