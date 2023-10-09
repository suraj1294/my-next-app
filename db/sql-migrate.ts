import { connect } from "@planetscale/database";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { config } from "./sql-config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const conn = connect(config);
  const db = drizzle(conn);

  await migrate(db, {
    migrationsFolder: "drizzle/mysql",
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
