"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

// 🔥 Fix visual para íconos rotos en producción (como Vercel o Railway)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapSelector({
  onSelectLocation,
  lat,
  lng,
}: {
  onSelectLocation: (lat: number, lng: number) => void;
  lat: number | null;
  lng: number | null;
}) {
  return (
    <MapContainer
      center={lat && lng ? [lat, lng] : [-3.47, -79.97]} // Santa Rosa, El Oro por defecto
      zoom={13}
      scrollWheelZoom={true}
      className="h-72 w-full rounded mb-4"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onSelectLocation} />
    </MapContainer>
  );
}
