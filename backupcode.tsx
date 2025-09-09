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
                                        

