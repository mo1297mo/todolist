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
      console.log("Fetched todos:", todos);
      res.json(todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
      res.status(500).json({ message: err.message });
    }
  },
  getTodoById: async (req, res) => {
    // Implement logic to find a todo by ID
  },
  updateTodo: async (req, res) => {
    // Implement logic to update a todo
  },
  deleteTodo: async (req, res) => {
    // Implement logic to delete a todo
  }
};

module.exports = todoController;