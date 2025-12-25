# Database Setup Guide

This application uses PostgreSQL. For free hosting, we recommend using **Supabase** (100% free tier).

## Option 1: Supabase (Recommended - Free)

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Go to Project Settings > Database
5. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)
6. Update your Netlify environment variables (see below)

## Option 2: Neon (Free Tier)

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string
5. Update your Netlify environment variables

## Setting Up Netlify Environment Variables

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add a new variable:
   - Key: `DATABASE_URL`
   - Value: Your PostgreSQL connection string from Supabase/Neon
4. Save

## Running Database Migrations

After setting up the database, you need to create the tables. The application will auto-seed data on first request, but you need to create the tables first.

### Recommended: Use the SQL Migration File

The easiest way is to use the provided SQL file:

1. Copy the contents of `migrations/001_initial_schema.sql`
2. Go to your Supabase dashboard
3. Navigate to SQL Editor
4. Paste and run the SQL
5. Verify tables were created (you should see `inquiries`, `services`, `testimonials`)

### Alternative: Use Drizzle Kit

You can also use Drizzle Kit to push the schema:

```bash
npm install
# Set DATABASE_URL environment variable
export DATABASE_URL="your-connection-string-here"  # On Windows: set DATABASE_URL=your-connection-string-here
npm run db:push
```

### Manual SQL (if needed)

Or manually run this SQL in your database:

```sql
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
```

## Testing

Once your database is set up and environment variables are configured in Netlify, redeploy your site. The functions will automatically seed initial data on first use.

