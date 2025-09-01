// import { PrismaClient } from '@prisma/client';
// import sampleData from './sample-data';
// import { hash } from '@/lib/encrypt';


// async function main() {
//   const prisma = new PrismaClient();
//   await prisma.product.deleteMany();
//   await prisma.account.deleteMany();
//   await prisma.session.deleteMany();
//   await prisma.verificationToken.deleteMany();
//   await prisma.user.deleteMany();

//   await prisma.product.createMany({ data: sampleData.products });
//   const users = [];
//   for (let i = 0; i < sampleData.users.length; i++) {
//     users.push({
//       ...sampleData.users[i],
//       password: await hash(sampleData.users[i].password),
//     });
//     console.log(
//       sampleData.users[i].password,
//       await hash(sampleData.users[i].password)
//     );
//   }
//   await prisma.user.createMany({ data: users });

//   console.log('Database seeded successfully!');
// }

// main();
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import sampleData from './sample-data';
import { hash } from '@/lib/encrypt';

// Load environment variables from .env file
const envPath = resolve(__dirname, '../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error.message);
  process.exit(1);
}

// Validate encryption key
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey || encryptionKey.length === 0) {
  console.error('Error: ENCRYPTION_KEY environment variable is not set or empty');
  console.error('Please set a valid encryption key in your .env file');
  process.exit(1);
}

async function main() {
  const prisma = new PrismaClient();
  
  try {
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.product.createMany({ data: sampleData.products });
    
    const users = [];
    for (let i = 0; i < sampleData.users.length; i++) {
      users.push({
        ...sampleData.users[i],
        password: await hash(sampleData.users[i].password),
      });
      console.log(
        sampleData.users[i].password,
        await hash(sampleData.users[i].password)
      );
    }
    
    await prisma.user.createMany({ data: users });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();