import express from "express";
import customerRoutes from "./customer.js";
import inventoryRoutes from "./inventry.js";
import categoryRoutes from "./category.js";
import loanRoutes from "./loan.js";

const router = express.Router();
router.use("/customer", customerRoutes);
router.use("/inventry", inventoryRoutes);
router.use("/category", categoryRoutes);
router.use("/loan", loanRoutes);

export default router;
