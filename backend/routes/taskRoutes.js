const express = require('express');
const { getTasks, completeTask } = require('../services/taskService');
const router = express.Router();

// Route to get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to complete a task
router.post('/:taskId', async (req, res) => {
  const { email } = req.body;
  const taskId = req.params.taskId;

  try {
    const updatedUser = await completeTask(email, taskId);
    res.status(200).json({ message: 'Task completed successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
