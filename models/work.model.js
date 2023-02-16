const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  demo: {
    type: String,
    required: true,
  },
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
