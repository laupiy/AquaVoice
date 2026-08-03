'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatDate } from '@/utils/helpers';
import 'leaflet/dist/leaflet.css';

const statusColors = {
  safe: '#14B8A6',
  warning: '#F59E0B',
  critical: '#E11D48',
};

function createIcon(status) {
  const color = statusColors[status] || statusColors.safe;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function FitBounds({ stations }) {
  const map = useMap();
  useEffect(() => {
    if (stations.length > 0) {
      const bounds = L.latLngBounds(stations.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [stations, map]);
  return null;
}

export default function WaterMapView({ stations, filter, onFilterChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = filter === 'all' ? stations : stations.filter((s) => s.status === filter);

  const filters = [
    { key: 'all', label: 'Semua' },
    { key: 'safe', label: '🟢 Aman' },
    { key: 'warning', label: '🟡 Waspada' },
    { key: 'critical', label: '🔴 Bahaya' },
  ];

  if (!mounted) {
    return <div className="h-[500px] rounded-2xl bg-mist-100 animate-pulse" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
              filter === f.key
                ? 'bg-current-500 border-current-500 text-white'
                : 'bg-white border-mist-200 text-slate-ink/55 hover:border-current-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="h-[500px] rounded-2xl overflow-hidden border border-mist-200">
        <MapContainer center={[-6.9, 107.55]} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds stations={filtered} />
          {filtered.map((station) => (
            <Marker key={station.id} position={[station.lat, station.lng]} icon={createIcon(station.status)}>
              <Popup>
                <div className="min-w-[200px] space-y-2">
                  <p className="font-semibold text-sm">{station.name}</p>
                  <StatusBadge status={station.status} />
                  <div className="text-xs space-y-1 mt-2">
                    <p>WQI: <strong>{station.wqi}</strong></p>
                    <p>pH: {station.ph}</p>
                    <p>Suhu: {station.temperature}°C</p>
                    <p>DO: {station.dissolvedOxygen} mg/L</p>
                    <p>Kekeruhan: {station.turbidity} NTU</p>
                    <p className="text-gray-500">Update: {formatDate(station.lastUpdated)}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
