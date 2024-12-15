import express from "express";
import userRouter from "./user.js";
import customerRoutes from "./customer.js";
import inventoryRoutes from "./inventry.js";
import categoryRoutes from "./category.js";

const router = express.Router();

// router.get("/user", (req,res)=>{
//     res.status(200).send("this is router")
// });
router.use("/customer", customerRoutes);
router.use("/inventry", inventoryRoutes);
router.use("/category", categoryRoutes)

export default router;
