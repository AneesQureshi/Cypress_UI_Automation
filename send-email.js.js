// send-email.js
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import fs from 'fs';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
});

// Load Cypress HTML report
const reportPath = './cypress/reports/index.html';
const reportHtml = fs.readFileSync(reportPath, 'utf-8');

mg.messages.create(process.env.MAILGUN_DOMAIN, {
  from: 'Cypress Reports <mailgun@' + process.env.MAILGUN_DOMAIN + '>',
  to: ['muhammadanish2011@gmail.com'], // Change to your recipient email
  subject: 'Cypress Test Report',
  html: reportHtml
})
.then(msg => console.log('Email sent:', msg))
.catch(err => console.error('Mailgun error:', err));
