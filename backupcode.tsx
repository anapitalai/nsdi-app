"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { ViewStateChangeEvent } from 'react-map-gl/maplibre';

const BASEMAP_STYLES = [
    {
        name: 'Carto Light',
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    },
    {
        name: 'Carto Dark',
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    },
    {
        name: 'OSM Liberty',
        style: 'https://demotiles.maplibre.org/style.json',
    },
];

const MapGL = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.default as any), { ssr: false }) as any;
const Marker = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.Marker as any), { ssr: false }) as any;
const Popup = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.Popup as any), { ssr: false }) as any;


const MapLandingPage = () => {
    const [basemap, setBasemap] = useState(BASEMAP_STYLES[0].style);
    const [initialViewState, setInitialViewState] = useState({
        longitude: 147.02,
        latitude: -6.629,
        zoom: 6,
    });
    const [fullscreen, setFullscreen] = useState(false);
    const [spatials, setSpatials] = useState<any[]>([]);
    const [selected, setSelected] = useState<any | null>(null);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/landmarks');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Center and zoom to fit all points if available
                    if (data.length > 0) {
                        const lats = data.map((d: any) => d.lat);
                        const lons = data.map((d: any) => d.lon);
                        const minLat = Math.min(...lats);
                        const maxLat = Math.max(...lats);
                        const minLon = Math.min(...lons);
                        const maxLon = Math.max(...lons);
                        const centerLat = (minLat + maxLat) / 2;
                        const centerLon = (minLon + maxLon) / 2;
                        // Estimate zoom: crude formula, works for most cases
                        const latDiff = maxLat - minLat;
                        const lonDiff = maxLon - minLon;
                        let zoom = 6;
                        const maxDiff = Math.max(latDiff, lonDiff);
                        if (maxDiff > 0) {
                            zoom = Math.max(2, 10 - Math.log2(maxDiff * 10));
                        }
                        setInitialViewState(vs => ({ ...vs, latitude: centerLat, longitude: centerLon, zoom }));
                    }
                    console.log('First 5 spatial points:', data.slice(0, 5).map(d => ({ id: d.id, lat: d.lat, lon: d.lon, location_name: d.location_name })));
                }
                setSpatials(data);
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error('Failed to fetch spatials', e);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <h1 className="text-2xl font-bold mb-4">Geospatial Map (Mapbox)</h1>
            <div className="mb-4 flex items-center gap-4">
                <div>
                    <label htmlFor="basemap-select" className="mr-2 font-medium">Basemap:</label>
                    <select
                        id="basemap-select"
                        value={basemap}
                        onChange={e => setBasemap(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        {BASEMAP_STYLES.map(b => (
                            <option key={b.style} value={b.style}>{b.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => setFullscreen(f => !f)}
                    className="border rounded px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm font-medium"
                >
                    {fullscreen ? 'Exit Fullscreen' : 'Full Screen'}
                </button>
            </div>
            <div
                className={
                    fullscreen
                        ? 'fixed inset-0 z-50 bg-white flex items-center justify-center' // fullscreen overlay
                        : 'w-full max-w-2xl h-[600px]'
                }
                style={fullscreen ? { width: '100vw', height: '100vh' } : {}}
            >
                <MapGL
                    initialViewState={initialViewState}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle={basemap}
                >
                    {spatials.map((spatial) => (
                        <Marker
                            key={spatial.id}
                            longitude={spatial.lon}
                            latitude={spatial.lat}
                            anchor="bottom"
                        >
                            <button
                                className="cursor-pointer bg-transparent border-none p-0"
                                title={spatial.location_name}
                                aria-label={spatial.location_name}
                                style={{ background: 'none', pointerEvents: 'auto' }}
                                onClick={e => {
                                    e.stopPropagation();
                                    setSelected(spatial);
                                }}
                            >
                                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#shadow)">
                                        <path d="M16 2C9.372 2 4 7.372 4 14c0 7.732 9.09 15.36 11.6 17.36a2 2 0 0 0 2.8 0C18.91 29.36 28 21.732 28 14c0-6.628-5.372-12-12-12z" fill="#F97316"/>
                                        <circle cx="16" cy="14" r="5" fill="#fff"/>
                                    </g>
                                    <defs>
                                        <filter id="shadow" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15"/>
                                        </filter>
                                    </defs>
                                </svg>
                            </button>
                        </Marker>
                    ))}
                    {selected && (
                        <Popup
                            longitude={selected.lon}
                            latitude={selected.lat}
                            anchor="top"
                            onClose={() => setSelected(null)}
                            closeOnClick={false}
                        >
                            <div className="text-sm">
                                <div className="font-bold mb-1">{selected.location_name}</div>
                                <div>Lat: {selected.lat}</div>
                                <div>Lon: {selected.lon}</div>
                            </div>
                        </Popup>
                    )}
                </MapGL>
                {fullscreen && (
                    <button
                        onClick={() => setFullscreen(false)}
                        className="absolute top-4 right-4 z-60 border rounded px-3 py-1 bg-white/80 hover:bg-white text-sm font-medium shadow"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default MapLandingPage;
                                        




// 'use client';
// import dynamic from 'next/dynamic';
// import { useState, useEffect, useCallback } from 'react';
// import type { LandMark } from '@/types';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// const MapGL = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.default), { ssr: false });
// const Marker = dynamic(() => import('react-map-gl/mapbox').then(mod => mod.Marker), { ssr: false });

// const SATELLITE_STYLE = 'mapbox://styles/mapbox/satellite-v9';
// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
// const PIN_SVG = '/assets/pin.svg';
// const INITIAL_VIEW_STATE = {
//   longitude: 143.9555,
//   latitude: -6.314993,
//   zoom: 10,
// };

// export default function SatelliteMapPage() {
//   const [landmarks, setLandmarks] = useState<LandMark[]>([]);
//   const [zoom, setZoom] = useState(INITIAL_VIEW_STATE.zoom);
//   const [polygonCoords, setPolygonCoords] = useState<{ lon: number; lat: number }[]>([]);
//   const [area, setArea] = useState<number | null>(null);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch('/api/landmarks');
//         if (!res.ok) throw new Error('Failed to fetch landmarks');
//         const data = await res.json();
//         setLandmarks(data);
//       } catch (e) {
//         // eslint-disable-next-line no-console
//         console.error('Failed to fetch landmarks', e);
//       }
//     })();
//   }, []);

//   // Handle map click to add coordinates
//   const handleMapClick = useCallback((event: any) => {
//     const { lngLat } = event;
//     setPolygonCoords((prev) => [...prev, { lon: lngLat.lng, lat: lngLat.lat }]);
//   }, []);

//   // Calculate area using the Shoelace formula (for simple polygons)
//   const calculateArea = () => {
//     if (polygonCoords.length < 3) {
//       setArea(null);
//       return;
//     }
//     // Convert lat/lon to planar coordinates (approximate, for small areas)
//     const R = 6371000; // Earth radius in meters
//     const coords = polygonCoords.map(({ lon, lat }) => {
//       const x = R * lon * Math.PI / 180 * Math.cos((polygonCoords[0].lat * Math.PI) / 180);
//       const y = R * lat * Math.PI / 180;
//       return { x, y };
//     });
//     let sum = 0;
//     for (let i = 0; i < coords.length; i++) {
//       const { x: x1, y: y1 } = coords[i];
//       const { x: x2, y: y2 } = coords[(i + 1) % coords.length];
//       sum += x1 * y2 - x2 * y1;
//     }
//     setArea(Math.abs(sum / 2));
//   };

//   const handleAddMark = () => {
//     router.push('/auth/sign-in?callbackUrl=/admin/landmarks/create');
//   };

//   return (
//     <div className="w-screen h-screen absolute inset-0 z-0">
//       <MapGL
//         initialViewState={INITIAL_VIEW_STATE}
//         mapStyle={SATELLITE_STYLE}
//         mapboxAccessToken={MAPBOX_TOKEN}
//         style={{ width: '100vw', height: '100vh' }}
//         onMove={evt => setZoom(evt.viewState.zoom)}
//         onClick={handleMapClick}
//         onLoad={() => setMapLoaded(true)}
//       >
//         {mapLoaded && zoom >= 6 && landmarks.map(lm => (
//           <Marker key={lm.id} longitude={lm.lon} latitude={lm.lat} anchor="bottom">
//             <Image src={PIN_SVG} alt={lm.location_name} width={32} height={32} />
//           </Marker>
//         ))}
//         {/* Draw polygon points as pin markers */}
//         {mapLoaded && polygonCoords.map((pt, idx) => (
//           <Marker key={`polypt-${idx}`} longitude={pt.lon} latitude={pt.lat} anchor="bottom">
//             <Image src={PIN_SVG} alt={`Polygon Point ${idx + 1}`} width={32} height={32} />
//           </Marker>
//         ))}
//         {/* Floating Add Mark Button */}
//         <button
//           onClick={handleAddMark}
//           className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl border-4 border-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//           title="Add New Mark"
//         >
//           +
//         </button>
//         {/* Floating Area Calculation Button */}
//         <button
//           onClick={calculateArea}
//           className="fixed bottom-28 right-8 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-2xl border-4 border-white focus:outline-none focus:ring-2 focus:ring-green-400"
//           title="Calculate Area from Coordinates"
//         >
//           &#x25A1;
//         </button>
//         {/* Show area result */}
//         {area !== null && (
//           <div className="fixed bottom-44 right-8 z-50 bg-white text-gray-800 rounded-lg shadow-lg px-4 py-2 border border-gray-300">
//             Area: {area.toLocaleString()} m²
//           </div>
//         )}
//       </MapGL>
//     </div>
//   );
// }



