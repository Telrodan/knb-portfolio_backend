const TodoTask = require('../../models/todo-list/task.model');

exports.createTask = (req, res, next) => {
  const task = new TodoTask({
    title: req.body.title,
    listId: req.body.listId,
    checked: req.body.checked,
  });
  task
    .save()
    .then((createdTask) => {
      res.status(201).json({
        message: 'Task added succesfully.',
        task: {
          ...createdTask._doc,
          id: createdTask._id,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'ERROR:',
        error: err,
      });
    });
};

exports.getTask = (req, res, next) => {
  TodoTask.findById(req.params.id)
    .then((document) => {
      res.status(200).json(document);
    })
    .catch((err) => {
      res.status(404).json({
        message: 'ERROR:',
        error: err,
      });
    });
};

exports.getTasks = (req, res, next) => {
  TodoTask.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Tasks fetched sucessfully!',
        tasks: documents,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'ERROR:',
        error: err,
      });
    });
};

exports.updateTask = (req, res, next) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    listId: req.body.listId,
    checked: req.body.checked,
  };
  TodoTask.findByIdAndUpdate({ _id: req.params.id }, task)
    .then(() => {
      res.status(200).json({
        message: 'Update succesfull.',
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'ERROR:',
        error: err,
      });
    });
};

exports.deleteTask = (req, res, next) => {
  TodoTask.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        message: 'Task deleted.',
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'ERROR:',
        error: err,
      });
    });
};
