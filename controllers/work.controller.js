const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const Work = require('../models/work.model');

exports.addWork = catchAsync(async (req, res, next) => {
  const work = await Work.create({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    code: req.body.code,
    demo: req.body.demo,
  });
  res.status(201).json({
    status: 'success',
    list: work._doc,
  });
});

exports.getWorks = catchAsync(async (req, res, next) => {
  const works = await Work.find();
  if (!works) return new AppError('No works found.', 404);
  res.status(200).json({
    status: 'success',
    works,
  });
});
