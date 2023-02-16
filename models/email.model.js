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
  sentAt: {
    type: Date,
    default: Date.now(),
  },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
