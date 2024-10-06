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
app.use(express.json())

const port = 4000;

// Define route to fetch tasks
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/signup', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .insert({ email: email, tasksCompleted: [], badges: [] })

    if (error) {
      console.log("ERROR BACKEND: ", error)
      throw error;
    }

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

//route to add id to completed task to user
app.post(':userId/tasks/:taskId/complete', async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .update({ tasksCompleted: supabase.sql`tasksCompleted || ${taskId}` })
      .match({ id: userId })
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Task completed successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
