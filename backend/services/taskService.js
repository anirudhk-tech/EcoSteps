const supabase = require('../config/supabase');

// Get all tasks from the database
const getTasks = async () => {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*');

  if (error) {
    throw error;
  }

  return tasks;
};

// Get a random task from the list that is not already completed
const getRandomTask = async (email) => {
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('tasks')
    .eq('email', email)
    .single();
  if (fetchError) throw fetchError;

  const { data: tasks, error: taskError } = await supabase
    .from('tasks')
    .select('*');

  if (taskError) throw taskError;

  const completedTasks = userData.tasks || [];
  const incompleteTasks = tasks.filter((task) => !completedTasks.includes(task.id));
  const randomTask = incompleteTasks[Math.floor(Math.random() * incompleteTasks.length)];
  return randomTask;
};

// Complete a task by appending taskId to user's tasks list
const completeTask = async (email, taskId) => {
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('tasks')
    .eq('email', email)
    .single();

  if (fetchError) throw fetchError;

  const updatedTasks = userData.tasks ? [...userData.tasks, parseInt(taskId.trim())] : [parseInt(taskId.trim())];

  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ tasks: updatedTasks })
    .eq('email', email)
    .single();

  if (updateError) throw updateError;

  return updatedUser;
};

module.exports = {
  getTasks,
  completeTask,
  getRandomTask,
};
