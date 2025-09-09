import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { psmSpatialData } from './sample_spatial';

// Load environment variables from .env file
const envPath = resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

async function main() {
  const prisma = new PrismaClient();
  try {
    // Optional: Clear existing LandMark data
  await prisma.landMark.deleteMany();

    // Insert all spatial data
  await prisma.landMark.createMany({ data: psmSpatialData });

    console.log('LandMark data seeded successfully!');
  } catch (error) {
    console.error('Error seeding LandMark data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
