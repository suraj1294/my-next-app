import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const db = drizzle(
    postgres(`${process.env.DATABASE_URL}`, { ssl: "require", max: 1 })
  );
  await migrate(db, {
    migrationsFolder: "drizzle/pg",
  });
}

main()
  .then((res) => {
    console.log("Tables migrated!");

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error performing migration: ", err);

    process.exit(1);
  });
