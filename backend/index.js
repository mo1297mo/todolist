// Import express
const express = require('express');
// Import body-parser (if needed, for Express < 4.16.0)
// const bodyParser = require('body-parser');
// Import cors
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4200' }));

// Create an instance of express
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Middleware
// For Express >= 4.16.0, body-parser has been re-added under the methods express.json() and express.urlencoded()
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors()); // Enable CORS for all requests

// Define a simple route for GET request
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
