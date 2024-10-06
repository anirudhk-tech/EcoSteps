const supabase = require('../config/supabase');

// Create a new class 
const createClass = async (teacher, goal) => {
  const { data: user, error } = await supabase
    .from('classes')
    .insert([{ teacher: teacher, students: [], goal: goal }])
    .single();

  if (error) {
    throw error;
  }

  return user;
};

// Get students in a class
const getStudentsById = async (teacher) => {
  const { data: students, error } = await supabase
    .from('classes')
    .select('students')
    .eq('teacher', teacher);

  if (error) {
    throw error;
  }

  return students;
};

module.exports = {
  createClass, getStudentsById
};

