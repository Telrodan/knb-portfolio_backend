const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const todoListRouter = require('./routes/todo-list/todo-list-routes');
const todoTaskRouter = require('./routes/todo-list/todo-task-routes');
const Email = require('./models/email-model');

const app = express();

const DATABASE = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
sgMail.setApiKey(process.env.SENDGRID_KEY);
mongoose.set('strictQuery', false);
mongoose
  .connect(DATABASE, { useNewUrlParser: true })
  .then(() => console.log('Conntected to database!'))
  .catch((err) => {
    console.log('ERROR:', err);
  });

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.post('/api/v1/send-mail', (req, res, next) => {
  const email = new Email({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    sentTime: req.body.sentTime,
  });
  console.log(email);
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
      email.save().then(() => {
        console.log('email saved');
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
app.use('/api/v1/todo-list/list', todoListRouter);
app.use('/api/v1/todo-list/task', todoTaskRouter);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  err.status = 'fail';
  err.statusCode = 404;
  res.send(err);
});

module.exports = app;
