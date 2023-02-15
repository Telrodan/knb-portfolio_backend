const sgMail = require('@sendgrid/mail');
const catchAsync = require('../utils/catch-async');
const Email = require('../models/email.model');

exports.sendEmail = catchAsync(async (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const msg = {
    to: req.body.email,
    from: process.env.SENDGRID_EMAIL,
    templateId: 'd-307ac2bb96fd4673ac1bcaff59b153fb',
    dynamicTemplateData: {
      name: req.body.name,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      const email = new Email({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        sentTime: req.body.sentTime,
      });
      return email;
    })
    .then((email) => {
      email.save();
    })
    .then(() => {
      res.status(200).json({
        message: 'Message sent and saved!',
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
