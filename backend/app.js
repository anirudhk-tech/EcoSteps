const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
