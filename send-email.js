// send-email.js
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const fs = require('fs');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

// Load Cypress HTML report
const reportPath = './cypress/reports/mochawesome.html';
let reportHtml;

try {
  reportHtml = fs.readFileSync(reportPath, 'utf-8');
} catch (err) {
  console.error(`Error reading report file: ${err.message}`);
  process.exit(1);
}

mg.messages
  .create(process.env.MAILGUN_DOMAIN, {
    from: `Cypress Reports <mailgun@${process.env.MAILGUN_DOMAIN}>`,
    to: ['muhammadanish2011@gmail.com'], // change to your email
    subject: 'Cypress Test Report',
    html: reportHtml,
  })
  .then((msg) => console.log('Email sent:', msg))
  .catch((err) => console.error('Mailgun error:', err));
