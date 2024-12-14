import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import dotenv from "dotenv";
import { checkEnvVariables } from "./utils/envChecker";

dotenv.config();
checkEnvVariables();

export const client = postgres(process.env.POSTGRES_URL as string);
export const db = drizzle(client, {
  schema: {},
});
