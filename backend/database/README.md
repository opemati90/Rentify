# Rentify Database Documentation

This directory contains all database-related files for the Rentify application.

## Files

- **schema.sql** - Complete database schema with tables, indexes, triggers, and RLS policies
- **seed.sql** - Sample data for development and testing
- **migrate.ts** - Database migration script

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Note your project URL and anon/service role keys
4. Go to SQL Editor in your Supabase dashboard

### 2. Run Schema

1. Open the SQL Editor in Supabase
2. Copy the contents of `schema.sql`
3. Paste and execute the SQL
4. Verify all tables are created in the Table Editor

### 3. Seed Data (Optional)

1. In the SQL Editor, copy the contents of `seed.sql`
2. Paste and execute the SQL
3. This will create:
   - Admin user (email: admin@rentify.com, password: admin123)
   - 3 host users
   - 2 regular users
   - 6 sample properties
   - Sample reviews, bookings, messages

### 4. Configure Environment Variables

Update your `.env` file with Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Using Migration Script

Run migrations programmatically:

```bash
npm run migrate
```

Or with seed data:

```bash
npm run seed
```

## Database Schema Overview

### Tables

1. **users** - User accounts with authentication and profile information
   - Fields: id, name, email, password, role, avatar, verified, trust_score, phone, bio
   - Roles: user, host, admin

2. **properties** - Property listings
   - Fields: id, host_id, title, description, type, price, bedrooms, bathrooms, location, amenities, status
   - Types: apartment, house, condo, villa, studio
   - Status: pending, approved, rejected

3. **bookings** - Reservation records
   - Fields: id, user_id, property_id, check_in, check_out, guests, total_price, status
   - Status: pending, confirmed, cancelled, completed

4. **reviews** - Property and host reviews
   - Fields: id, user_id, property_id, host_id, rating, comment
   - Constraint: Users can only review a property once

5. **messages** - In-app messaging between users
   - Fields: id, sender_id, receiver_id, property_id, content, read

6. **saved_properties** - User's saved/liked properties
   - Junction table: user_id + property_id

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- Users can view all public data
- Users can only modify their own data
- Hosts can manage their own properties
- Admins have elevated permissions (handled at application level)

### Indexes

Optimized indexes for:
- Property searches (location, type, price, status)
- User lookups (email, verification status)
- Booking queries (dates, status)
- Message threads
- Review aggregations

## Sample Data Details

### Test Accounts

**Admin:**
- Email: admin@rentify.com
- Password: admin123

**Hosts:**
- john@example.com (password: password123)
- sarah@example.com (password: password123)
- mike@example.com (password: password123)

**Users:**
- emily@example.com (password: password123)
- david@example.com (password: password123)

### Sample Properties

- Modern Downtown Apartment (NYC) - $120/night
- Luxury Beachfront Villa (Miami) - $450/night
- Cozy Studio in Arts District (LA) - $75/night
- Spacious Family House (Austin) - $200/night
- Elegant City Condo (Chicago) - $180/night
- Pending Review Property (Portland) - $95/night

## Maintenance

### Backup

Use Supabase dashboard to create backups:
1. Go to Database > Backups
2. Download database backup
3. Store securely

### Reset Database

To reset the database:

```sql
-- Drop all tables
DROP TABLE IF EXISTS saved_properties CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Then re-run schema.sql and seed.sql
```

### Update Schema

When making schema changes:
1. Create a new migration file with timestamp
2. Test locally first
3. Apply to production via Supabase SQL Editor
4. Document changes in version control

## Troubleshooting

### Connection Issues

Check your environment variables are correct:
```bash
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY
```

### RLS Errors

If getting permission errors, verify:
1. User is authenticated
2. JWT token is valid
3. RLS policies allow the operation

### Foreign Key Errors

Ensure parent records exist before creating child records:
- Users must exist before creating properties
- Properties must exist before creating bookings/reviews

## Support

For Supabase-specific issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
