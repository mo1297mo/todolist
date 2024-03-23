// Import express
const express = require('express');
// Import cors
const cors = require('cors');

// Database connection
require('../mongoDB/database');

// Import todoRoutes
const todoRoutes = require('../router/todoRoutes.js');

// Create an instance of express
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // To parse JSON bodies

// Read CORS origin from .env file, default to 'http://localhost:4200' if not set
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
};

// Enable CORS for all requests using the CORS options
app.use(cors(corsOptions));


// Define a route handler for GET request to /api/todos
app.use('/api/todos', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
