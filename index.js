import express from "express";
import corsConfig from "./src/core/config/cors.js";
import connectDB from "./src/core/database/connection.js";
import globalExceptionHandler from "./src/utils/globalException.js";
import logger from "./src/core/config/logger.js";
import "dotenv/config";
import responseInterceptor from "./src/utils/responseInterceptor.js";

import router from "./src/routes/routes.js";
import { Code } from "./src/models/code.js";

const app = express();
const PORT = (() => {
  const env = process.env.ENV;
  return env === "development" ? 7200 : 4545;
})();

app.use(express.json());
app.use(corsConfig);

app.use((req, res, next) => {
  logger.info(
    `Incoming request: ${req.method} ${req.originalUrl} Body - ${req?.body} Headers - ${req?.headers}`
  );
  next();
});

const insertCodeData = async () => {
  const existingCustomerRecord = await Code.findOne({ code: "CUST" });

  if (!existingCustomerRecord) {
    const codeRecord = new Code({
      name: "Customer",
      code: "CUST",
      number: 1,
    });

    await codeRecord.save();
  }

  const existingLoandRecord = await Code.findOne({ code: "LOAN" });

  if (!existingLoandRecord) {
    const codeRecord = new Code({
      name: "Loan",
      code: "LOAN",
      number: 1,
    });

    await codeRecord.save();
  }
};

connectDB()
  .then(() => {
    logger.info("Database connected successfully");
    insertCodeData();
  })
  .catch((err) => {
    logger.error(`Database connection failed: ${err.message}`);
  });

app.use(responseInterceptor);
app.use("/api/v1/", router);
app.use(globalExceptionHandler);
app.listen(PORT, () => {
  logger.info(`Server is running at port ${PORT}`);
});
