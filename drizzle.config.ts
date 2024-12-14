import type { Config } from 'drizzle-kit';

export default {
  schema: './src/server/_model/**/*.ts',
  out: './src/server/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;
