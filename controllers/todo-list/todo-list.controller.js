const TodoList = require('../../models/todo-list/list.model');

exports.createList = (req, res, next) => {
  const list = new TodoList({
    title: req.body.title,
    category: req.body.category,
  });
  list
    .save()
    .then((createdList) => {
      res.status(201).json({
        message: 'List added successfully',
        list: {
          ...createdList._doc,
          id: createdList._id,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

exports.getList = (req, res, next) => {
  TodoList.findById(req.params.id)
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(404).json({
        message: 'List not found.',
        error: err,
      });
    });
};

exports.getLists = (req, res, next) => {
  TodoList.find().then((collection) => {
    res.status(200).json({
      message: 'Lists fetched sucessfully!',
      lists: collection,
    });
  });
};

exports.updateList = (req, res, next) => {
  const list = {
    id: req.body.id,
    title: req.body.title,
    category: req.body.category,
  };
  TodoList.findByIdAndUpdate({ _id: req.params.id }, list)
    .then(() => {
      res.status(200).json({
        message: 'Update succesfull',
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'Error',
        error: err,
      });
    });
};

exports.deleteList = (req, res, next) => {
  TodoList.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        message: 'List deleted.',
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'List not found',
        error: err,
      });
    });
};
