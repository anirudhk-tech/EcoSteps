import { NextResponse } from 'next/server';
import { supabase } from './utils/supabase/client';

export async function middleware(req) {
  const res = NextResponse.next();

  // Get the session token from Supabase
  const supabaseToken = req.cookies['sb-access-token'];

  // Check if the token exists (i.e., if the user is logged in)
  if (!supabaseToken) {
    // If no token, redirect to landing page
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Optionally, you can verify the session using Supabase auth
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));  // Redirect to landing if no session
  }

  return res;  // Allow access to the page if logged in
}

// Apply middleware to all protected routes
export const config = {
  matcher: ['/dashboard', '/profile', '/tasks'], // Define paths where middleware should apply
};
