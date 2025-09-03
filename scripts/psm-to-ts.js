const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../documentation_images/psm.txt');
const outputPath = path.join(__dirname, '../db/spatial.ts');

const lines = fs.readFileSync(inputPath, 'utf-8').split('\n').filter(Boolean);

const objects = lines.map(line => {
  const obj = JSON.parse(line.replace(/,$/, ''));
  return {
    id: obj._id?.$oid || '',
    location_name: obj.location_name || '',
    eastings: parseFloat(obj.eastings?.$numberDouble || obj.eastings || '0'),
    northings: parseFloat(obj.northings?.$numberDouble || obj.northings || '0'),
    eastings_error: parseFloat(obj.eastings_error?.$numberDouble || obj.eastings_error || '0'),
    northings_error: parseFloat(obj.northings_error?.$numberDouble || obj.northings_error || '0'),
    ellipsoidal_height: obj.ellipsoidal_height ? parseFloat(obj.ellipsoidal_height?.$numberDouble || obj.ellipsoidal_height) : null,
    ellipsoidal_height_error: obj.ellipsoidal_height_error ? parseFloat(obj.ellipsoidal_height_error?.$numberDouble || obj.ellipsoidal_height_error) : null,
    n_value: obj.n_value ? parseFloat(obj.n_value?.$numberDouble || obj.n_value) : null,
    mean_sea_level: obj.mean_sea_level ? parseFloat(obj.mean_sea_level?.$numberDouble || obj.mean_sea_level) : null,
    lat: obj.lat ? parseFloat(obj.lat?.$numberDouble || obj.lat) : undefined,
    lon: obj.lon ? parseFloat(obj.lon?.$numberDouble || obj.lon) : undefined,
    psm_type: obj.psm_type || undefined,
  };
});

const tsType = `
export type PsmSpatial = {
  id: string;
  location_name: string;
  eastings: number;
  northings: number;
  eastings_error: number;
  northings_error: number;
  ellipsoidal_height: number | null;
  ellipsoidal_height_error: number | null;
  n_value: number | null;
  mean_sea_level: number | null;
  lat?: number;
  lon?: number;
  psm_type?: string;
};
`;

const tsArray = `export const psmSpatialData: PsmSpatial[] = ${JSON.stringify(objects, null, 2)};\n`;

fs.writeFileSync(outputPath, `// spatial.ts\n// Auto-generated from psm.txt\n${tsType}\n${tsArray}`);

console.log('db/spatial.ts generated successfully!');
