import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const userRouter = Router();
import userController from "../controllers/user.js";
userRouter.post("/register", asyncHandler(userController.userLogin));
userRouter.post("/login", asyncHandler(userController.userLogin));
export default userRouter;
