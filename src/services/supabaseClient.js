import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xzhlfpvgjmnaribsrytq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6aGxmcHZnam1uYXJpYnNyeXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MTk0ODksImV4cCI6MjEwOTA5NTQ4OX0.AotBxPfwjqJ1XQWD5njWrpGJ-iTK7LIKdtJHdaYEvJU';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

