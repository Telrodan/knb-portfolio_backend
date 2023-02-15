const express = require('express');
const todoController = require('../../controllers/todo.controller');

const router = express.Router();

router.route('').get(todoController.getLists).post(todoController.addList);

router
  .route('/:id')
  .put(todoController.updateList)
  .delete(todoController.deleteList);

module.exports = router;
