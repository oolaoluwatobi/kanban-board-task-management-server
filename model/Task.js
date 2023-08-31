const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['todo', 'doing', 'done'], // Restrict values to these three options
    default: 'todo', // Set 'todo' as the default value
  },
});

module.exports = mongoose.model("task", taskSchema);
