import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.DATABASE_URL?.includes('neon.tech')) {
  // Neon (WebSocket)
  // These imports must be at the top of the file for CommonJS/TypeScript
  // If you want to support both, you must install all dependencies in your project
  // and use the Neon config only if needed.
  // @ts-ignore
  const { Pool, neonConfig } = require('@neondatabase/serverless');
  // @ts-ignore
  const { PrismaNeon } = require('@prisma/adapter-neon');
  // @ts-ignore
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
  const connectionString = `${process.env.DATABASE_URL}`;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  prisma = new PrismaClient({ adapter });
} else {
  // Standard Postgres
  prisma = new PrismaClient();
}

export { prisma };
