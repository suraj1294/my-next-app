import { User, users } from "@/db/pg-schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

export default async function getAllUsers(): Promise<User[]> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const db = drizzle(pool);

  const results = await db.select().from(users);

  pool.end();

  return results;
}
