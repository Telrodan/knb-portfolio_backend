const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connection = require('./db');

const todoListRouter = require('./routes/todo-list/todo-list.routes');
const todoTaskRouter = require('./routes/todo-list/todo-task.routes');
const emailRouter = require('./routes/email.routes');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();
const apiVersion = '/api/v1/';

connection();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.options('*', cors());

app.use(`${apiVersion}todo/task`, todoTaskRouter);
app.use(`${apiVersion}todo/list`, todoListRouter);
app.use(`${apiVersion}emails`, emailRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
