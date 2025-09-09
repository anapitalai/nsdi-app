import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  const landmarks = await prisma.landMark.findMany();
  await prisma.$disconnect();
  return NextResponse.json(landmarks);
}
