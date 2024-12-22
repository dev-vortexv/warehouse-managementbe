import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const __dirname = path
  .dirname(new URL(import.meta.url).pathname)
  .replace(/^\/([a-zA-Z]:)/, "$1")
  .replace(/%20/g, " ");

export const generateInventryInvoicePDF = async (invoiceData, res) => {
  const invoiceDir = path.join(__dirname, "..", "inventry_invoices");
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `invoice_${invoiceData.lot_number}_${timestamp}.pdf`;
  const filePath = path.join(invoiceDir, fileName);

  const doc = new PDFDocument({ margin: 50 });
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  const lineGap = 20;

  doc.fontSize(20).text("Gopal Foods", 50, 50);
  doc
    .fontSize(10)
    .text("123/23 Nrk Bussiness Park ", 50, 75)
    .text("Medanta Road Indore", 50, 90)
    .text("Phone: +91 7354540145", 50, 105)
    .text("Email: info@vortexv.com", 50, 120)
    .moveDown();

  let yPosition = 150;
  doc.fontSize(14).text("Invoice", 50, yPosition);
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`Lot Number : ${invoiceData.lot_number}`, 50, (yPosition += lineGap))
    .text(
      `Date: ${new Date().toLocaleDateString()}`,
      50,
      (yPosition += lineGap),
    );

  yPosition += 20;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  yPosition += 10;
  doc.fontSize(12).text("Bill To:", 50, yPosition);
  doc
    .font("Helvetica-Bold")
    .text(
      `${invoiceData.customer.firstName} ${invoiceData.customer.lastName}`,
      50,
      (yPosition += lineGap),
    )
    .font("Helvetica")
    .text(
      `Address: ${invoiceData.customer.address || "NA"}`,
      50,
      (yPosition += lineGap),
    )
    .text(
      `Phone: ${invoiceData.customer.phoneNo || "NA"}`,
      50,
      (yPosition += lineGap),
    )
    .text(
      `Email: ${invoiceData.customer.email || "NA"}`,
      50,
      (yPosition += lineGap),
    );

  yPosition += 20;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  yPosition += 10;
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Item Description", 50, yPosition)
    .text("Rate", 200, yPosition, { align: "left" })
    .text("Quantity", 300, yPosition, { align: "left" })
    .text("Amount", 400, yPosition, { align: "left" });

  yPosition += 15;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  yPosition += 10;
  doc
    .font("Helvetica")
    .text(
      `${invoiceData.inventory_name} - ${invoiceData.inventory_desc}`,
      50,
      yPosition,
    )
    .text(`Rs${invoiceData.rate.toFixed(2)}`, 200, yPosition, { align: "left" })
    .text(`${invoiceData.qty}`, 300, yPosition, { align: "left" })
    .text(
      `Rs${(invoiceData.qty * invoiceData.rate).toFixed(2)}`,
      400,
      yPosition,
      {
        align: "left",
      },
    );

  yPosition += 30;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
  doc
    .font("Helvetica-Bold")
    .text("Subtotal", 400, (yPosition += lineGap), { align: "left" })
    .text(
      `Rs${(invoiceData.qty * invoiceData.rate).toFixed(2)}`,
      500,
      yPosition,
      {
        align: "left",
      },
    )
    .font("Helvetica")
    .text("Discount", 400, (yPosition += lineGap), { align: "left" })
    .text(`Rs${invoiceData.discount.toFixed(2)}`, 500, yPosition, {
      align: "left",
    })
    .font("Helvetica-Bold")
    .text("Total", 400, (yPosition += lineGap), { align: "left" })
    .text(
      `Rs${(invoiceData.qty * invoiceData.rate - invoiceData.discount).toFixed(2)}`,
      500,
      yPosition,
      { align: "left" },
    );

  yPosition += 30;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
  doc.fontSize(10).text("Thank you for your business!", 50, (yPosition += 10), {
    align: "center",
  });
  doc.end();
  await new Promise((resolve) => writeStream.on("finish", resolve));
  return filePath;
};

export const generateInventryLoan = async (invoiceData, res) => {
  const invoiceDir = path.join(__dirname, "..", "loan_invoices");
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `invoice_${invoiceData.lot_number}_${timestamp}.pdf`;
  const filePath = path.join(invoiceDir, fileName);

  const doc = new PDFDocument({ margin: 50 });
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  const lineGap = 20;

  doc.fontSize(20).text("Gopal Foods", 50, 50);
  doc
    .fontSize(10)
    .text("123/23 Nrk Bussiness Park ", 50, 75)
    .text("Medanta Road Indore", 50, 90)
    .text("Phone: +91 7354540145", 50, 105)
    .text("Email: info@vortexv.com", 50, 120)
    .moveDown();

  let yPosition = 150;
  doc.fontSize(14).text("Invoice", 50, yPosition);
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`Lot Number : ${invoiceData.lot_number}`, 50, (yPosition += lineGap))
    .text(
      `Date: ${new Date().toLocaleDateString()}`,
      50,
      (yPosition += lineGap),
    );

  yPosition += 20;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  yPosition += 10;
  doc.fontSize(12).text("Bill To:", 50, yPosition);
  doc
    .font("Helvetica-Bold")
    .text(
      `${invoiceData.customer.firstName} ${invoiceData.customer.lastName}`,
      50,
      (yPosition += lineGap),
    )
    .font("Helvetica")
    .text(
      `Address: ${invoiceData.customer.address || "NA"}`,
      50,
      (yPosition += lineGap),
    )
    .text(
      `Phone: ${invoiceData.customer.phoneNo || "NA"}`,
      50,
      (yPosition += lineGap),
    )
    .text(
      `Email: ${invoiceData.customer.email || "NA"}`,
      50,
      (yPosition += lineGap),
    );

  yPosition += 20;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  yPosition += 10;
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Item Description", 50, yPosition)
    .text("Rate", 200, yPosition, { align: "left" })
    .text("Quantity", 300, yPosition, { align: "left" })
    .text("Amount", 400, yPosition, { align: "left" });

  yPosition += 15;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();

  yPosition += 10;
  doc
    .font("Helvetica")
    .text(
      `${invoiceData.inventory_name} - ${invoiceData.inventory_desc}`,
      50,
      yPosition,
    )
    .text(`Rs${invoiceData.rate.toFixed(2)}`, 200, yPosition, { align: "left" })
    .text(`${invoiceData.qty}`, 300, yPosition, { align: "left" })
    .text(
      `Rs${(invoiceData.qty * invoiceData.rate).toFixed(2)}`,
      400,
      yPosition,
      {
        align: "left",
      },
    );

  yPosition += 30;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
  doc
    .font("Helvetica-Bold")
    .text("Subtotal", 400, (yPosition += lineGap), { align: "left" })
    .text(
      `Rs${(invoiceData.qty * invoiceData.rate).toFixed(2)}`,
      500,
      yPosition,
      {
        align: "left",
      },
    )
    .font("Helvetica")
    .text("Discount", 400, (yPosition += lineGap), { align: "left" })
    .text(`Rs${invoiceData.discount.toFixed(2)}`, 500, yPosition, {
      align: "left",
    })
    .font("Helvetica-Bold")
    .text("Total", 400, (yPosition += lineGap), { align: "left" })
    .text(
      `Rs${(invoiceData.qty * invoiceData.rate - invoiceData.discount).toFixed(2)}`,
      500,
      yPosition,
      { align: "left" },
    );

  yPosition += 30;
  doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
  doc.fontSize(10).text("Thank you for your business!", 50, (yPosition += 10), {
    align: "center",
  });
  doc.end();
  await new Promise((resolve) => writeStream.on("finish", resolve));
  return filePath;
};
