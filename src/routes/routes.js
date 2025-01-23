import express from "express";
import customerRoutes from "./customer.js";
import inventoryRoutes from "./inventry.js";
import categoryRoutes from "./category.js";
import loanRoutes from "./loan.js";
import transactionRoutes from "./inventry_transaction.js";
import reportsRoutes from "./reports.js";
import paymentRoutes from "./payment.js";
import userRouter from "./user.js";

const router = express.Router();
router.use("/customer", customerRoutes);
router.use("/inventry", inventoryRoutes);
router.use("/category", categoryRoutes);
router.use("/loan", loanRoutes);
router.use("/transaction", transactionRoutes);
router.use("/report", reportsRoutes);
router.use("/payment", paymentRoutes);
router.use("/user", userRouter)

export default router;
