const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connection = require('./db');

const workRoutes = require('./routes/work.routes');
const emailRouter = require('./routes/email.routes');
const todoListRouter = require('./routes/todo-list/todo-list.routes');
const todoTaskRouter = require('./routes/todo-list/todo-task.routes');

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

app.use(`${apiVersion}works`, workRoutes);
app.use(`${apiVersion}emails`, emailRouter);
app.use(`${apiVersion}todo/task`, todoTaskRouter);
app.use(`${apiVersion}todo/list`, todoListRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
