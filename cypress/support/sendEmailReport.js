const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Path to HTML report
const reportPath = path.join(__dirname, "cypress/reports/mochawesome.html");

if (!fs.existsSync(reportPath)) {
  console.log("Report not found, skipping email.");
  process.exit(0);
}

const reportHtml = fs.readFileSync(reportPath, "utf-8");

// Configure transporter
let transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Mail options
let mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_RECIPIENT, // recipient(s) from secret
  subject: "Cypress Test Report - FAILURE",
  html: reportHtml,
};

// Send email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.error(err);
  else console.log("Email sent: " + info.response);
});
