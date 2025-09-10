// spatial.ts
// Auto-generated from psm.txt

export type PsmSpatial = {
  // id: string;
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

export const psmSpatialData: PsmSpatial[] = [
  {
    // "id": "60641c469b237e79d70fc9e8",
    "location_name": "POSI",
    "eastings": 502219.074,
    "northings": 9267253.927,
    "eastings_error": 0.016,
    "northings_error": 0.014,
    "ellipsoidal_height": 243.024,
    "ellipsoidal_height_error": 0.025,
    "n_value": 73.124,
    "mean_sea_level": 169.9,
    "lat": -6.629086922898567,
    "lon": 147.02007558741502,
    "psm_type": "Stick"
  },
  {
    // "id": "60641c469b237e79d70fc9e3",
    "location_name": "GOBA",
    "eastings": 503379.197,
    "northings": 9270724.194,
    "eastings_error": 0.023,
    "northings_error": 0.018,
    "ellipsoidal_height": 370.388,
    "ellipsoidal_height_error": 0.03,
    "n_value": 73.438,
    "mean_sea_level": 296.95,
    "lat": -6.597693979442154,
    "lon": 147.0305690941675,
    "psm_type": "Stick"
  },
  {
    "location_name": "PSM 13036 CS 32",
    "eastings": 499654.122,
    "northings": 9258195.258,
    "eastings_error": 0.018,
    "northings_error": 0.014,
    "ellipsoidal_height": 97.191,
    "ellipsoidal_height_error": 0.025,
    "n_value": 72.92,
    "mean_sea_level": 24.27,
    "lat": -6.711032836204373,
    "lon": 146.9968703801871,
    "psm_type": "Stick"
  },
    {
    "location_name": "PSM 3374",
    "eastings": 499626.505,
    "northings": 9264038.266,
    "eastings_error": 0.016,
    "northings_error": 0.008,
    "ellipsoidal_height": 141.086,
    "ellipsoidal_height_error": 0.025,
    "n_value": 72.946,
    "mean_sea_level": 68.14,
    "lat": -6.658176500919567,
    "lon": 146.9966208552939,
    "psm_type": "Stick"
  },
  {
    "location_name": "BUKU",
    "eastings": 503556.319,
    "northings": 9272304.937,
    "eastings_error": 0.032,
    "northings_error": 0.03,
    "ellipsoidal_height": 430.249,
    "ellipsoidal_height_error": 0.018,
    "n_value": 73.583,
    "mean_sea_level": 356.67,
    "lat": -6.583394294830846,
    "lon": 147.0321704641167,
    "psm_type": "Stick"
  },

];

// export const sampleLandmarks = [
//   {
//     id: '1',
//     location_name: 'Port Moresby',
//     eastings: 400000,
//     northings: 9000000,
//     eastings_error: 0.5,
//     northings_error: 0.5,
//     ellipsoidal_height: 50.2,
//     ellipsoidal_height_error: 0.3,
//     n_value: 1.2,
//     mean_sea_level: 48.7,
//     lat: -9.478,
//     lon: 147.150,
//     psm_type: 'urban',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '2',
//     location_name: 'Lae',
//     eastings: 420000,
//     northings: 9020000,
//     eastings_error: 0.4,
//     northings_error: 0.4,
//     ellipsoidal_height: 60.1,
//     ellipsoidal_height_error: 0.2,
//     n_value: 1.1,
//     mean_sea_level: 59.9,
//     lat: -6.722,
//     lon: 146.984,
//     psm_type: 'urban',
//     createdAt: new Date().toISOString(),
//   },
//   // Add more sample landmarks as needed
//];
