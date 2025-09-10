import { PrismaClient } from '@prisma/client';


let prisma: PrismaClient;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

if (process.env.DATABASE_URL?.includes('neon.tech')) {
  // Neon (WebSocket)
  if (!globalForPrisma.prisma) {
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
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  prisma = globalForPrisma.prisma;
} else {
  // Standard Postgres
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };


