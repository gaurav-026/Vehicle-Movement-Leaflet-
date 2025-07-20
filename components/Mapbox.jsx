'use client';
import React, { useEffect, useState } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    ZoomControl,
    Polyline,
    Tooltip,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations } from '../dummy-route';

const vehicleIcon = new Icon({
    iconUrl: '/car.png',
    iconSize: [25, 25],
    iconAnchor: [15, 10],
});

const Mapbox = () => {
    const [route, setRoute] = useState(locations);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(true);

    // Simulate vehicle movement
    useEffect(() => {
        if (!playing || route.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev < route.length - 1) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [playing, route]);

    // Get current vehicle location
    const current = route[index];
    const polylinePoints = route.slice(0, index + 1).map(p => [p.latitude, p.longitude]);

    return (
        <div className="w-full h-screen relative">
            <MapContainer
                center={[current.latitude, current.longitude]}
                zoom={10}
                scrollWheelZoom={true}
                className="w-full h-full"
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer url="https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />

                {current &&
                    <Marker position={[current.latitude, current.longitude]} icon={vehicleIcon} className="transition-all duration-300">
                        <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false} className='transition-all duration-300'>
                            <div className="text-sm">
                                <p>Latitude: {current.latitude}</p>
                                <p>Longitude: {current.longitude}</p>
                                <p>Time: {new Date(current.timestamp).toLocaleTimeString()}</p>
                            </div>
                        </Tooltip>
                    </Marker>}
                {polylinePoints.length > 0 && <Polyline positions={polylinePoints} color="blue" className='transition-all duration-300' />}
                {/* {current && <FlyToLocation center={[current.latitude, current.longitude]} />} */}
                <ZoomControl position="bottomright" />
            </MapContainer>

            {/* Play/Pause Button */}
            <div className="absolute top-4 left-4 z-[999]">
                <button
                    onClick={() => setPlaying(!playing)}
                    className="bg-white px-4 py-2 rounded shadow text-black"
                >
                    {playing ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default Mapbox;
