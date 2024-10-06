const supabase = require('../config/supabase');

// Create a new user with an empty task list
const createUser = async (email, role) => {
  const { data: user, error } = await supabase
    .from('users')
    .insert([{ email: email, role, tasks: [], badges: [] }])
    .single();

  if (error) {
    throw error;
  }

  return user;
};

const signout = async () => {
  
  const { data: user, error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  return user;
};

module.exports = {
  createUser,
};
