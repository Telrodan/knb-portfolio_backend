const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const todoTaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Task must have a title.'],
  },
  listId: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});

todoTaskSchema.plugin(uniqueValidator);

const TodoTask = mongoose.model('TodoTask', todoTaskSchema);

module.exports = TodoTask;
