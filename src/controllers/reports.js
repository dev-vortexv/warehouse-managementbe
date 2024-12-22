import { Message, statusCodes } from "../core/common/constant.js";
import * as reportService from "../services/repots.js";

const getLoanReport = async (req, res, next) => {
  const loans = await reportService.generateLoanReport(req, res, next);
  res.status(statusCodes?.ok).send(loans);
};

const getInventoryReport = async (req, res, next) => {
  const loans = await reportService.generateInventoryReport(req, res, next);
  res.status(statusCodes?.ok).send(loans);
};

const getPaymentReport = async (req, res, next) => {
  const loans = await reportService.generatePaymentReport(req, res, next);
  res.status(statusCodes?.ok).send(loans);
};

const getInventoryReportByDate = async (req, res, next) => {
  const start_date = req.params.start_date;
  const end_date = req.params.end_date;

  const loans = await reportService.getInventoryReportByDate(
    start_date,
    end_date,
    next,
  );
  res.status(statusCodes?.ok).send(loans);
};

const getLoanReportByDate = async (req, res, next) => {
  const start_date = req.params.start_date;
  const end_date = req.params.end_date;

  const loans = await reportService.generateLoanReportByDate(
    start_date,
    end_date,
    next,
  );
  res.status(statusCodes?.ok).send(loans);
};

export default {
  getPaymentReport,
  getLoanReport,
  getInventoryReport,
  getInventoryReportByDate,
  getLoanReportByDate,
};
