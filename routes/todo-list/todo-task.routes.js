const express = require('express');
const todoController = require('../../controllers/todo.controller');

const todoTaskRouter = express.Router();

todoTaskRouter
  .route('')
  .get(todoController.getTasks)
  .post(todoController.addTask);

todoTaskRouter
  .route('/:id')
  .put(todoController.updateTask)
  .delete(todoController.deleteTask);

module.exports = todoTaskRouter;
