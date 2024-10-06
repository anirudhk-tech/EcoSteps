const supabase = require('../config/supabase');

// Create a new user with an empty task list
const createUser = async (email) => {
  const { data: user, error } = await supabase
    .from('users')
    .insert([{ email: email, tasks: [] }])
    .single();

  if (error) {
    throw error;
  }

  return user;
};

module.exports = {
  createUser,
};
