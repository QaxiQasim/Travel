import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not set. Database features will crash if used.",
  );
}

const getDbUrl = () => {
  let url = process.env.DATABASE_URL;
  if (!url) return undefined;
  
  // Fix unencoded '@' in password if present
  if (url.includes('Qasim@254922')) {
    url = url.replace('Qasim@254922', 'Qasim%40254922');
  }

  if (url.includes("db.peqlupbkjtxlarbmhewm.supabase.co")) {
    url = url.replace("db.peqlupbkjtxlarbmhewm.supabase.co:5432", "aws-0-ap-northeast-1.pooler.supabase.com:6543");
    url = url.replace("postgresql://postgres:", "postgresql://postgres.peqlupbkjtxlarbmhewm:");
  }
  
  return url;
};

const dbUrl = getDbUrl();
const isPooler = dbUrl && dbUrl.includes("pooler.supabase.com");

export const pool = dbUrl 
  ? new Pool({ 
      connectionString: dbUrl,
      ...(isPooler ? { ssl: { rejectUnauthorized: false } } : {})
    }) 
  : null;
export const db = pool ? drizzle(pool, { schema }) : null as any;

export * from "./schema/index.js";
export { eq, desc, sql } from "drizzle-orm";
