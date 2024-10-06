const express = require('express');
const { createUser } = require('../services/userService');
const { createClass, getStudentsById } = require('../services/classService');
const router = express.Router();

// Route to create a new user
router.post('/signup', async (req, res) => {
  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await createUser(email, role);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// if the role is teacher, create a new class with teacher's email
router.post('/createclass', async (req, res) => {
  const { teacher, goal } = req.body;

  if (!teacher) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const newClass = await createClass(teacher, goal);
    res.status(201).json({ message: 'Class created successfully', newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get my students
router.get('/students', async (req, res) => {
  const { teacher } = req.body;

  if (!teacher) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const students = await getStudentsById(teacher);
    res.status(201).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
