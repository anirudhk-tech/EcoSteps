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
};
