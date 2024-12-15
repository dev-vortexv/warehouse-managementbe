import * as categoryService from "../services/category.js";
import { Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

const addCategory = async (req, res, next) => {
  const categoryData = await categoryService.addCategory(req, res, next);
  res.status(statusCodes?.created).send(categoryData);
};

const getAllCategories = async (req, res, next) => {
  const categories = await categoryService.getAllCategories(req, res, next);
  res.status(statusCodes?.ok).send(categories);
};

const getCategoryById = async (req, res, next) => {
  const category = await categoryService.getCategoryById(req.params.id, next);
  if (!category) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send(category);
};

const updateCategory = async (req, res, next) => {
  const updatedCategory = await categoryService.updateCategory(req.params.id, req.body, next);
  if (!updatedCategory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send({ message: Message?.updateSuccess, updatedCategory });
};

const deleteCategory = async (req, res, next) => {
  const deletedCategory = await categoryService.deleteCategory(req.params.id, next);
  if (!deletedCategory) {
    throw new CustomError(Message?.notFound, statusCodes?.notFound);
  }
  res.status(statusCodes?.ok).send({ message: Message?.deleteSuccess });
};

export default {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
