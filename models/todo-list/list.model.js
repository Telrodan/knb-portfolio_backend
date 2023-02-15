const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: [true, 'List must have a title.'],
  },
});

const TodoList = mongoose.model('TodoList', todoListSchema);

module.exports = TodoList;
