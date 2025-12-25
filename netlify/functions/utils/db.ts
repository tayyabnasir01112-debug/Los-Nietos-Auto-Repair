import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../../../shared/schema";

const { Pool } = pg;

// For Netlify Functions, we need to handle connection pooling differently
// Create a singleton pool to reuse connections
let pool: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    pool = new Pool({
      connectionString: databaseUrl,
      // For serverless, use smaller pool size and shorter timeouts
      max: 1, // Single connection per function instance
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

export const db = drizzle(getPool(), { schema });

