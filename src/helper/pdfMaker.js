import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const generateInvoicePDF = async (invoiceData) => {
  const invoiceDir = path.join(__dirname, "..", "invoices");

  // Check if the directory exists, if not, create it
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true }); // Ensure the directory exists
  }

  // Define the path for the PDF file
  const filePath = path.join(
    invoiceDir,
    `invoice_${invoiceData.invoiceNumber}.pdf`
  );

  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF to a writable stream (the file we want to save)
  doc.pipe(fs.createWriteStream(filePath));

  // Add content to the PDF (this is an example, you can customize it as needed)
  doc.fontSize(18).text("Invoice", { align: "center" });
  doc.fontSize(12).text(`Customer: ${invoiceData.customerName}`, 100, 100);
  doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 100, 120);
  doc.text(`Date: ${invoiceData.date}`, 100, 140);
  doc.text(`Amount: $${invoiceData.amount.toFixed(2)}`, 100, 160);
  doc.text(`Interest Rate: ${invoiceData.interestRate}%`, 100, 180);
  doc.text(
    `Interest Amount: $${invoiceData.interestAmount.toFixed(2)}`,
    100,
    200
  );
  doc.text(
    `Total: $${(invoiceData.amount + invoiceData.interestAmount).toFixed(2)}`,
    100,
    220
  );

  // Finalize the PDF and end the stream
  doc.end();

  // Return the file path where the PDF is saved
  return filePath;
};
