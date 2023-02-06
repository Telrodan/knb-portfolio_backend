const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentTime: {
    type: String,
    required: true,
  },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
