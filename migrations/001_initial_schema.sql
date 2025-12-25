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

