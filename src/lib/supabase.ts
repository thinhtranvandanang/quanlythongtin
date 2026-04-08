import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export interface Entry {
  id: string;
  user_id: string;
  content: string;
  summary: string;
  type: 'task' | 'event' | 'knowledge';
  priority: 'low' | 'medium' | 'high';
  complexity: number;
  suggested_action?: string;
  status: 'pending' | 'done';
  created_at: string;
  next_reminder?: string;
}
