const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const todoListRouter = require('./routes/todo-list-routes');
const todoTaskRouter = require('./routes/todo-task-routes');

const app = express();

const DATABASE = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.set('strictQuery', false);
mongoose
  .connect(DATABASE, { useNewUrlParser: true })
  .then(() => console.log('Conntected to database!'))
  .catch((err) => {
    console.log('ERROR:', err);
  });

sgMail.setApiKey(process.env.SENDGRID_KEY);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use('/api/v1/todo-list/list', todoListRouter);
app.use('/api/v1/todo-list/task', todoTaskRouter);
app.post('/api/v1/send-mail', (req, res, next) => {
  const msg = {
    to: req.body.email,
    from: process.env.SENDGRID_EMAIL,
    templateId: 'd-307ac2bb96fd4673ac1bcaff59b153fb',
    dynamicTemplateData: {
      name: req.body.name,
    },
  };
  console.log(msg);
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
});

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
//   );
//   next();
// });

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  err.status = 'fail';
  err.statusCode = 404;
  res.send(err);
});

module.exports = app;
