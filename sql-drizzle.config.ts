import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default {
  schema: "db/sql-schema.ts",
  out: "drizzle/mysql",
  driver: "mysql2",
  dbCredentials: {
    host: process.env["DATABASE_HOST"] as string,
    user: process.env["DATABASE_USERNAME"] as string,
    password: process.env["DATABASE_NAME"] as string,
    database: process.env["DATABASE_PASSWORD"] as string,
  },
} satisfies Config;
