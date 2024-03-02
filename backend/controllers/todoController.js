const Todo = require('../models/Todo');

const todoController = {
  createTodo: async (req, res) => {
    try {
      const todo = new Todo(req.body);
      await todo.save();
      res.status(201).json(todo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getTodos: async (req, res) => {
    try {
      console.log("Fetching todos from the database...");
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
      res.status(500).json({ message: err.message });
    }
  },
  
  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      res.status(500).json({ message: err.message });
    }
  },
  

  updateTodo: async (req, res) => {
    try {
      console.log("Received ID for update:", req.params.id);
      const updatedData = {
        title: req.body.title,
        description: req.body.description,
        isCompleted: !req.body.isCompleted,
        dueDate: req.body.dueDate
      };
      console.log("isCompleted from request:", updatedData.isCompleted);
      
      const todo = await Todo.findByIdAndUpdate(req.params.id, updatedData, { new: true });      
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      console.log("Updated todo:", todo);
      res.json(todo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  deleteTodo: async (req, res) => {
    try {
      console.log("Received ID for delete:", req.params.id);
      const result = await Todo.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
};

module.exports = todoController;