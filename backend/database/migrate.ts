import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('🚀 Starting database migration...\n');

    // Read schema file
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    console.log('📋 Running schema.sql...');

    // Split by statements (rough split on semicolons, handling multiline)
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement + ';'
        }).single();

        if (error) {
          // Some errors are expected (e.g., "already exists")
          if (error.message.includes('already exists')) {
            console.log('⚠️  Object already exists, skipping...');
          } else {
            console.error('❌ Error:', error.message);
            errorCount++;
          }
        } else {
          successCount++;
        }
      } catch (err: any) {
        console.error('❌ Error executing statement:', err.message);
        errorCount++;
      }
    }

    console.log('\n✅ Schema migration completed!');
    console.log(`   Success: ${successCount} statements`);
    if (errorCount > 0) {
      console.log(`   Errors: ${errorCount} statements`);
    }

    return true;
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    return false;
  }
}

async function runSeed() {
  try {
    console.log('\n🌱 Starting database seeding...\n');

    // Read seed file
    const seedPath = join(__dirname, 'seed.sql');
    const seed = readFileSync(seedPath, 'utf-8');

    console.log('📋 Running seed.sql...');

    const statements = seed
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement + ';'
        }).single();

        if (error) {
          if (error.message.includes('duplicate key')) {
            console.log('⚠️  Data already exists, skipping...');
          } else {
            console.error('❌ Error:', error.message);
            errorCount++;
          }
        } else {
          successCount++;
        }
      } catch (err: any) {
        console.error('❌ Error executing statement:', err.message);
        errorCount++;
      }
    }

    console.log('\n✅ Seed data insertion completed!');
    console.log(`   Success: ${successCount} statements`);
    if (errorCount > 0) {
      console.log(`   Errors: ${errorCount} statements`);
    }

    return true;
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    return false;
  }
}

async function verifyDatabase() {
  console.log('\n🔍 Verifying database...\n');

  try {
    // Check if tables exist
    const tables = ['users', 'properties', 'bookings', 'reviews', 'messages', 'saved_properties'];

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error(`❌ Table '${table}' not found or error:`, error.message);
      } else {
        console.log(`✅ Table '${table}' exists (${count || 0} rows)`);
      }
    }

    console.log('\n✅ Database verification completed!');
    return true;
  } catch (error: any) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const includesSeed = args.includes('--seed') || args.includes('-s');

  console.log('='.repeat(50));
  console.log('       Rentify Database Setup');
  console.log('='.repeat(50));

  // Run migration
  const migrationSuccess = await runMigration();

  if (!migrationSuccess) {
    console.error('\n❌ Migration failed. Exiting...');
    process.exit(1);
  }

  // Run seed if requested
  if (includesSeed) {
    const seedSuccess = await runSeed();

    if (!seedSuccess) {
      console.error('\n❌ Seeding failed. Exiting...');
      process.exit(1);
    }
  }

  // Verify database
  await verifyDatabase();

  console.log('\n' + '='.repeat(50));
  console.log('✨ All done! Database is ready to use.');
  console.log('='.repeat(50) + '\n');

  process.exit(0);
}

// Run if called directly
if (require.main === module) {
  main();
}

export { runMigration, runSeed, verifyDatabase };
