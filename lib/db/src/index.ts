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
  if (url && url.includes("db.peqlupbkjtxlarbmhewm.supabase.co")) {
    // Supabase direct connections are IPv6 only, Vercel requires IPv4.
    // Substitute with the IPv4 transaction pooler URL.
    url = url.replace("db.peqlupbkjtxlarbmhewm.supabase.co:5432", "aws-0-ap-northeast-1.pooler.supabase.com:6543");
    url = url.replace("postgresql://postgres:", "postgresql://postgres.peqlupbkjtxlarbmhewm:");
  }
  return url;
};

const dbUrl = getDbUrl();

export const pool = dbUrl 
  ? new Pool({ connectionString: dbUrl }) 
  : null;
export const db = pool ? drizzle(pool, { schema }) : null as any;

export * from "./schema/index.js";
export { eq, desc, sql } from "drizzle-orm";
