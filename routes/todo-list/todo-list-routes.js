const express = require('express');
const todoListController = require('../../controllers/todo-list/todo-list-controller');

const router = express.Router();

router
  .route('')
  .get(todoListController.getLists)
  .post(todoListController.createList);

router
  .route('/:id')
  .get(todoListController.getList)
  .put(todoListController.updateList)
  .delete(todoListController.deleteList);

module.exports = router;
