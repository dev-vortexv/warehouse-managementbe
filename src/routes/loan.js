import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import categoryController from "../controllers/category.js";

const loanRoutes = Router();

loanRoutes.post("/add", asyncHandler(categoryController.addCategory));
loanRoutes.get("/list", asyncHandler(categoryController.getAllCategories));
loanRoutes.get("/:id", asyncHandler(categoryController.getCategoryById));
loanRoutes.put("/:id", asyncHandler(categoryController.updateCategory));
loanRoutes.delete("/:id", asyncHandler(categoryController.deleteCategory));

export default loanRoutes;
