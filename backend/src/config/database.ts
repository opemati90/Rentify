import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

// Supabase client for easy database operations
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

// PostgreSQL pool for complex queries
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('users').select('count').limit(1);
    if (error) throw error;
    console.log('✓ Database connection successful');
    return true;
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    return false;
  }
};
