const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    ToDo: {
      type: Boolean,
      default: true
    },
    Doing: {
      type: Boolean,
      default: false
    },
    Done: {
      type: Boolean,
      default: false
    },
  }, 
});

module.exports = mongoose.model('task', taskSchema);