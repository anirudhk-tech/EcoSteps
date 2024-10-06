const supabase = require('../config/supabase');

// Create a new user with an empty task list
const createUser = async (email, role) => {
  const isTeacher = true;
  if(role !== 'teacher') {
    isTeacher = false;
  }
  const { data: user, error } = await supabase
    .from('users')
    .insert([{ email: email, teacher: isTeacher, tasks: [], badges: [] }])
    .single();

  if (error) {
    throw error;
  }

  return user;
};

module.exports = {
  createUser,
};
