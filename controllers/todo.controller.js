const TodoList = require('../models/todo-list/list.model');
const TodoTask = require('../models/todo-list/task.model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.addList = catchAsync(async (req, res, next) => {
  const list = await TodoList.create({
    listName: req.body.listName,
  });
  res.status(201).json({
    status: 'success',
    list: list._doc,
  });
});

exports.updateList = catchAsync(async (req, res, next) => {
  const list = {
    ...req.body,
  };
  await TodoList.findByIdAndUpdate({ _id: req.params.id }, list);
  res.status(200).json({
    status: 'sucess',
  });
});

exports.deleteList = catchAsync(async (req, res, next) => {
  await TodoList.deleteOne({
    _id: req.params.id,
  });
  res.status(200).json({
    status: 'success',
  });
});

exports.getLists = catchAsync(async (req, res, next) => {
  const lists = await TodoList.find();
  if (!lists) return new AppError('No lists found.', 404);
  res.status(200).json({
    status: 'sucess',
    lists,
  });
});

exports.addTask = catchAsync(async (req, res, next) => {
  const task = await TodoTask.create({
    taskName: req.body.taskName,
    listId: req.body.listId,
    checked: req.body.checked,
  });
  await task.save();
  res.status(201).json({
    status: 'success',
    task: task._doc,
  });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await TodoTask.find();
  if (!tasks) return new AppError('No tasks found.', 404);
  res.status(200).json({
    status: 'success',
    tasks,
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = {
    ...req.body,
  };
  await TodoTask.findByIdAndUpdate({ _id: req.params.id }, task);
  res.status(200).json({
    status: 'success',
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  await TodoTask.deleteOne({
    _id: req.params.id,
  });
  res.status(200).json({
    status: 'success',
  });
});
