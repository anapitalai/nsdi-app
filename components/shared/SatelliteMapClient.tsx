"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import 'mapbox-gl/dist/mapbox-gl.css';

const SATELLITE_STYLE = 'mapbox://styles/mapbox/satellite-v9';
const STREET_STYLE = 'mapbox://styles/mapbox/streets-v11';
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const Map = dynamic(() => import("react-map-gl/mapbox").then(mod => mod.default), { ssr: false });
const Marker = dynamic(() => import("react-map-gl/mapbox").then(mod => mod.Marker), { ssr: false });

type Spatial = {
  id: string;
  location_name: string;
  lon: number;
  lat: number;
};

type Props = {
  spatials: Spatial[];
};

const SatelliteMapClient = ({ spatials }: Props) => {
  const [basemap, setBasemap] = useState<string>(SATELLITE_STYLE);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, background: 'white', borderRadius: 8, padding: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <label htmlFor="basemap-select" style={{ marginRight: 8, fontWeight: 500 }}>Basemap:</label>
        <select
          id="basemap-select"
          value={basemap}
          onChange={e => setBasemap(e.target.value)}
          style={{ padding: 4, borderRadius: 4 }}
        >
          <option value={SATELLITE_STYLE}>Satellite</option>
          <option value={STREET_STYLE}>Street</option>
        </select>
      </div>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: spatials.length > 0 ? spatials[0].lon : 146.8205,
          latitude: spatials.length > 0 ? spatials[0].lat : -6.6715,
          zoom: 10,
          bearing: 0,
          pitch: 0,
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={basemap}
      >
        {spatials.map((spatial) => (
          <Marker
            key={spatial.id}
            longitude={spatial.lon}
            latitude={spatial.lat}
            anchor="bottom"
          >
            <Image src="/assets/pin.svg" alt={spatial.location_name} width={40} height={40} />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default SatelliteMapClient;
