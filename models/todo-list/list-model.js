const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const todoListSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'List must have a title.'],
  },
});

todoListSchema.plugin(uniqueValidator);

const TodoList = mongoose.model('TodoList', todoListSchema);

module.exports = TodoList;
