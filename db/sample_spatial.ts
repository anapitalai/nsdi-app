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
  }

];
