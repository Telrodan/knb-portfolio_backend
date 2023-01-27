const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
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

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/api/v1/todo-list/list', todoListRouter);
app.use('/api/v1/todo-list/task', todoTaskRouter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
// app.all('*', (req, res, next) => {
//   const err = new Error(`Can't find ${req.originalUrl} on the server`);
//   err.status = 'fail';
//   err.statusCode = 404;
//   res.send(err);
// });

module.exports = app;
