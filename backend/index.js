// Import dependencies
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create Express app
const app = express();
const port = 4000;

// Define route to fetch tasks
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tasks', async (req, res) => {
  try {
    // Fetch tasks from Supabase
    const { data: tasks, error } = await supabase
      .from('tasks_small')
      .select('*');

    if (error) {
      throw error;
    }

    // Send tasks as response
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
