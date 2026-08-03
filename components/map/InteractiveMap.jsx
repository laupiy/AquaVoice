'use client';

import React, { useEffect, useState } from 'react';

export default function InteractiveMap({ locations, selectedLocation, onSelectLocation }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Memuat CSS Leaflet secara dinamis di browser client
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Memuat Script Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || typeof window === 'undefined' || !window.L) return;

    const L = window.L;

    // Inisialisasi Peta jika belum ada
    if (!window._aquaMapInstance) {
      const map = L.map('aquavoice-map', {
        center: [-6.200000, 106.816666], // Default Pusat Indonesia/Jakarta
        zoom: 6,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | AquaVoice Marine Monitoring',
      }).addTo(map);

      window._aquaMapInstance = map;
      window._aquaMarkersGroup = L.layerGroup().addTo(map);
    }

    const map = window._aquaMapInstance;
    const markersGroup = window._aquaMarkersGroup;

    // Bersihkan marker lama
    markersGroup.clearLayers();

    // Tambahkan marker baru sesuai data terfilter
    locations.forEach((loc) => {
      // Icon Custom Kustom Lingkaran Warna Risiko
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background-color: ${loc.markerColor};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            font-weight: bold;
          ">
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(
        markersGroup
      );

      marker.on('click', () => {
        onSelectLocation(loc);
      });

      // Bind Tooltip Sederhana
      marker.bindTooltip(`<b>${loc.name}</b><br/>Skor: ${loc.waterScore}/100`, {
        direction: 'top',
        offset: [0, -10],
      });
    });

    // Zoom otomatis ke lokasi yang dipilih jika ada
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 10, {
        duration: 1.2,
      });
    }
  }, [mapLoaded, locations, selectedLocation, onSelectLocation]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
      {!mapLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-sm z-20">
          <div className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-xs font-bold text-slate-700">Memuat Peta Perairan Interaktif...</span>
        </div>
      )}

      {/* Div Tempat Rendering Leaflet Map */}
      <div id="aquavoice-map" className="w-full h-full z-10" />

      {/* Map Legend (Petunjuk Warna Risiko) */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1.5">
        <span className="font-bold text-slate-800 block text-[11px] mb-1">
          Legenda Level Risiko:
        </span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
          <span className="text-slate-600 font-semibold">Aman (Kualitas Tinggi)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-200" />
          <span className="text-slate-600 font-semibold">Waspada (Anomali Ringan)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-200" />
          <span className="text-slate-600 font-semibold">Bahaya (Tumpahan/Anoksia)</span>
        </div>
      </div>
    </div>
  );
}