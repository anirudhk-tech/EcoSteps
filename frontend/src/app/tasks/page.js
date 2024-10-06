'use client'
import { use, useEffect, useState } from 'react';
import { Box, Card, Grid, Paper, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { createClient } from '../utils/supabase/client';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const user = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        throw new Error('Failed to fetch user');
      }
      setEmail(data.user.email);
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    user();
    fetchTasks();
  }, []);

  const completeTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });
      if (!response.ok) {
        throw new Error('Failed to complete task');
      }
      const data = await response.json();
      console.log("Task completed successfully", data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>

      {tasks.length === 0 ? (
        <Alert severity="info">No tasks found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {task.task}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Impact: {task.impact}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => completeTask(task.id)}>
                  Complete
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
