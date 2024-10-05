// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

