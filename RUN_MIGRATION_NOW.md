# 🚀 Quick Database Migration - Run This Now!

## Step 1: Run SQL Migration in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/tgebweecmudkkcjuwkky
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `migrations/001_initial_schema.sql`:

```sql
-- Initial database schema for Los Nietos Auto Repair
-- Run this SQL in your Supabase/Neon/PostgreSQL database

CREATE TABLE IF NOT EXISTS "inquiries" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "vehicle_details" text NOT NULL,
  "service_type" text NOT NULL,
  "message" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "services" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "category" text NOT NULL,
  "price_min" integer NOT NULL,
  "price_max" integer NOT NULL,
  "description" text
);

CREATE TABLE IF NOT EXISTS "testimonials" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "rating" integer DEFAULT 5 NOT NULL,
  "text" text NOT NULL,
  "date" timestamp DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "inquiries_created_at_idx" ON "inquiries" ("created_at");
CREATE INDEX IF NOT EXISTS "services_category_idx" ON "services" ("category");
CREATE INDEX IF NOT EXISTS "testimonials_date_idx" ON "testimonials" ("date");
```

5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned" - this is correct!
7. Verify tables were created:
   - Go to **Table Editor** in the left sidebar
   - You should see 3 tables: `inquiries`, `services`, `testimonials`

## Step 2: Verify Migration

After running the SQL:
1. Go to **Table Editor**
2. Check that these tables exist:
   - ✅ `inquiries`
   - ✅ `services`
   - ✅ `testimonials`

Once you've done this, your database is ready! The Netlify Functions will automatically seed initial data on first request.

