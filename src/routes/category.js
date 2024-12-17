import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import categoryController from "../controllers/category.js";

const categoryRoutes = Router();

categoryRoutes.post("/add", asyncHandler(categoryController.addCategory));
categoryRoutes.get("/list", asyncHandler(categoryController.getAllCategories));
categoryRoutes.get("/:id", asyncHandler(categoryController.getCategoryById));
categoryRoutes.put("/:id", asyncHandler(categoryController.updateCategory));
categoryRoutes.delete("/:id", asyncHandler(categoryController.deleteCategory));

export default categoryRoutes;
