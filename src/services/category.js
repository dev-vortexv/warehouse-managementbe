import { Category } from "../models/category.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addCategory = async (req) => {
  let { name, desc, amount, no_of_days, active } = req.body;
  name = name.toLowerCase();
  const isCategoryAlreadyExist = await Category.findOne({ name });
  if (isCategoryAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const category = new Category({
    name,
    desc,
    amount,
    no_of_days,
    active,
  });
  const categoryData = await category.save();
  return categoryData;
};

export const getAllCategories = async () => {
  const categories = await Category.find().select("-__v");
  return categories;
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id).select("-__v");
  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return category;
};

export const updateCategory = async (id, updateData) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!updatedCategory) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return updatedCategory;
};

export const deleteCategory = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deleteSuccess,
  };
};
