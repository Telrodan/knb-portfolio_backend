const sgMail = require('@sendgrid/mail');

exports.sendMail = (req, res, next) => {
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
      res.status(200).json({
        message: 'Message sent!',
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: 'Error!',
        error,
      });
    });
};
