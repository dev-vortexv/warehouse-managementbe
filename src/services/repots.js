import { Loan } from "../models/loan.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { Inventry } from "../models/inventry.js";
import { Customer } from "../models/customer.js";
import mongoose from "mongoose";

export const generateInventoryReport = async () => {
  const inventories = await Inventry.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "inventry",
        as: "transactions",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $project: {
        product_name: 1,
        product_desc: 1,
        lot_number: 1,
        qty: 1,
        remaining_qty: 1,
        start_date: 1,
        customerDetails: { firstName: 1, lastName: 1, phoneNo: 1, email: 1 },
        transactions: 1,
        categoryDetails: { name: 1 },
        discount: 1,
        active: 1,
      },
    },
  ]);
  return inventories;
};


export const generateInventoryAllReport = async () => {
  const customers = (await Customer.find().lean()).map(item => item._id);

  const Inventries = await Inventry.find({
    remaining_qty: { $gte: 0 },
    customer: customers
  })
    .populate('customer')
    .lean();
  const loans = await Loan.find().lean();
  return Inventries.map(item => {
    if (item.is_loan) {
      item.loan = loans.find(loan => loan.inventry.equals(item._id)) || null;
    } else {
      item.loan = null;
    }
    return item;
  });
};


export const generateLoanReport = async () => {
  const loans = await Loan.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $lookup: {
        from: "inventries",
        localField: "inventry",
        foreignField: "_id",
        as: "inventryDetails",
      },
    },
    {
      $project: {
        "customerDetails.firstName": 1,
        "customerDetails.lastName": 1,
        "customerDetails.phoneNo": 1,
        "customerDetails.email": 1,
        amount: 1,
        interest_percentage: 1,
        duration_in_month: 1,
        status: 1,
        inventryDetails: { product_name: 1, lot_number: 1 },
      },
    },
  ]);
  return loans;
};

export const getInventoryReportByDate = async (start_date, end_date) => {
  const inventories = await Inventry.aggregate([
    // Match inventories based on the start and end date range
    {
      $match: {
        $or: [
          {
            start_date: {
              $gte: new Date(start_date),
              $lte: new Date(end_date),
            },
          },
          {
            end_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "inventry",
        as: "transactions",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $project: {
        product_name: 1,
        product_desc: 1,
        lot_number: 1,
        qty: 1,
        remaining_qty: 1,
        start_date: 1,
        customerDetails: { firstName: 1, lastName: 1, phoneNo: 1, email: 1 },
        transactions: 1,
        categoryDetails: { name: 1 },
        discount: 1,
        active: 1,
      },
    },
  ]);
  return inventories;
};


export const getCustomerInventoryData = async (customerId) => {
  try {
    // Aggregate pipeline to get the required data
    const result = await Customer.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(customerId) }, // Match the specific customer
      },
      {
        $lookup: {
          from: 'inventries', // Lookup the inventries collection
          localField: '_id',
          foreignField: 'customer',
          as: 'inventries', // Rename the result to 'inventries'
        },
      },
      {
        $unwind: {
          path: '$inventries',
          preserveNullAndEmptyArrays: true, // Preserve customers without inventory
        },
      },
      {
        $lookup: {
          from: 'transactions', // Lookup the transactions collection
          localField: 'inventries._id', // Match on inventory's _id
          foreignField: 'inventry', // Match transaction's inventry field
          as: 'inventries.transactions', // Rename the result to 'transactions' for each inventory
        },
      },
      {
        $group: {
          _id: '$_id', // Group by customer ID
          customerdata: { $first: '$$ROOT' }, // Keep the customer data
          inventries: { $push: '$inventries' }, // Push all inventries into the 'inventries' array
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          customerdata: 1, // Include customer data
          inventries: 1, // Include all inventories with their respective transactions
        },
      },
      {
        $replaceRoot: { // Replace the root to flatten the structure
          newRoot: { $mergeObjects: ['$customerdata', { inventries: '$inventries' }] }
        }
      }
    ]);

    if (result.length > 0) {
      return result[0]; // Return the first (and only) result
    } else {
      return null; // Return null if no result found
    }
  } catch (error) {
    console.error('Error fetching customer inventory data:', error);
    throw error;
  }
}

export const generateLoanReportByDate = async (start_date, end_date) => {
  const loans = await Loan.aggregate([
    // Match loans based on the start and end date range
    {
      $match: {
        // Assuming `loan_date` is the field in Loan collection to filter by date
        $or: [
          {
            start_date: {
              $gte: new Date(start_date),
              $lte: new Date(end_date),
            },
          },
          {
            end_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $lookup: {
        from: "inventries",
        localField: "inventry",
        foreignField: "_id",
        as: "inventryDetails",
      },
    },
    {
      $project: {
        "customerDetails.firstName": 1,
        "customerDetails.lastName": 1,
        "customerDetails.phoneNo": 1,
        "customerDetails.email": 1,
        amount: 1,
        interest_percentage: 1,
        duration_in_month: 1,
        status: 1,
        inventryDetails: { product_name: 1, lot_number: 1 },
      },
    },
  ]);
  return loans;
};

export const generatePaymentReport = async () => {
  const payments = await Payment.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $lookup: {
        from: "inventries",
        localField: "inventry",
        foreignField: "_id",
        as: "inventryDetails",
      },
    },
    {
      $lookup: {
        from: "loans",
        localField: "inventry",
        foreignField: "inventry",
        as: "loanDetails",
      },
    },
    {
      $project: {
        "customerDetails.firstName": 1,
        "customerDetails.lastName": 1,
        "customerDetails.phoneNo": 1,
        "customerDetails.email": 1,
        amount: 1,
        status: 1,
        type: 1,
        inventryDetails: { product_name: 1, lot_number: 1 },
        loanDetails: { amount: 1, interest_percentage: 1 },
      },
    },
  ]);
  return payments;
};
