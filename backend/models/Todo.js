const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true  // Automatically creates createdAt and updatedAt fields
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
