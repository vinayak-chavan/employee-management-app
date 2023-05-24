const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: true,
  requireTLS: true,
});
// // An array of attachments
// attachments: [
//     {
//         filename: 'text notes.txt',
//         path: 'notes.txt'
//     },
//  ]
