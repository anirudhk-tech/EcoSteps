// Import dependencies
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
//import cors
const cors = require('cors');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create Express app
const app = express();
app.use(express.json())
//use cors
app.use(cors());

const port = 4000;

// Define route to fetch tasks
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/:taskId', async (req, res) => {
  const { email } = req.body;
  const taskId = req.params.taskId;

  try {
    // Fetch the user by email
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('tasks')  // Select the 'tasks' field
      .eq('email', email)
      .single();

    if (fetchError) throw fetchError;

    // Append the new taskId to tasks (initialize if empty)
    const updatedTasks = userData.tasks ? [...userData.tasks, parseInt(taskId.trim())] : [parseInt(taskId.trim())];

    // Update the user's task list
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ tasks: updatedTasks })  // Update 'tasks' field
      .eq('email', email)
      .single();

    if (updateError) throw updateError;

    res.status(200).json({ message: 'Task completed successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post('/signup', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .insert([
       { email , teacher: false, tasks: [] , badges: [] }
      ])
      .single();

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
      .from('tasks')
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
