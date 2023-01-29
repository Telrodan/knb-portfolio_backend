const express = require('express');
const todoTaskController = require('../../controllers/todo-list/todo-task-controller');

const router = express.Router();

router
  .route('')
  .get(todoTaskController.getTasks)
  .post(todoTaskController.createTask);

router
  .route('/:id')
  .get(todoTaskController.getTask)
  .put(todoTaskController.updateTask)
  .delete(todoTaskController.deleteTask);

module.exports = router;
