import { prisma } from '@/db/prisma';

// Fetch all spatial/geospatial records (e.g., LandMark or Psm)
export async function getAllSpatials() {
  return prisma.landMark.findMany();
}

// Fetch a single spatial record by ID
export async function getSpatialById(id: string) {
  return prisma.landMark.findUnique({ where: { id } });
}

// Create a new spatial record
export async function createSpatial(data: {
  location_name: string;
  eastings: number;
  northings: number;
  eastings_error: number;
  northings_error: number;
  ellipsoidal_height: number;
  ellipsoidal_height_error: number;
  n_value: number;
  mean_sea_level: number;
  lat: number;
  lon: number;
  psm_type: string;
}) {
  return prisma.landMark.create({ data });
}

// Update a spatial record
export async function updateSpatial(id: string, data: Partial<{
  location_name: string;
  eastings: number;
  northings: number;
  eastings_error: number;
  northings_error: number;
  ellipsoidal_height: number;
  ellipsoidal_height_error: number;
  n_value: number;
  mean_sea_level: number;
  lat: number;
  lon: number;
  psm_type: string;
}>) {
  return prisma.landMark.update({ where: { id }, data });
}

// Delete a spatial record
export async function deleteSpatial(id: string) {
  return prisma.landMark.delete({ where: { id } });
}
