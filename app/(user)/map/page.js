'use client';

import React, { useState } from 'react';
import { WATER_MONITORING_LOCATIONS } from '@/lib/mapData';
import MapFilter from '@/components/map/MapFilter';
import InteractiveMap from '@/components/map/InteractiveMap';

export default function WaterMapPage() {
  const [locations] = useState(WATER_MONITORING_LOCATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState(WATER_MONITORING_LOCATIONS[0]);

  // Daftar sektor unik
  const sectors = Array.from(new Set(locations.map((loc) => loc.sector)));

  // Filtering data lokasi
  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = selectedRisk === 'ALL' || loc.riskLevel === selectedRisk;
    const matchesSector = selectedSector === 'ALL' || loc.sector === selectedSector;

    return matchesSearch && matchesRisk && matchesSector;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
          Geospatial Marine Intelligence
        </span>
        <h1 className="text-2xl font-black text-slate-800 mt-1">
          Peta Monitoring Risiko Perairan
        </h1>
        <p className="text-xs text-slate-500">
          Pantau sebaran kualitas air dan titik potensi pencemaran di seluruh wilayah secara real-time.
        </p>
      </div>

      {/* Filter Bar */}
      <MapFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRisk={selectedRisk}
        setSelectedRisk={setSelectedRisk}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        sectors={sectors}
      />

      {/* Main Grid: Interactive Map & Location Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Leaflet Map (Spans 2 Columns) */}
        <div className="lg:col-span-2">
          <InteractiveMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={(loc) => setSelectedLocation(loc)}
          />
        </div>

        {/* Right Column: Selected Location Detail Card */}
        <div className="space-y-4">
          {selectedLocation ? (
            <div className="card-base p-6 space-y-4 animate-in fade-in duration-200 sticky top-20">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                    {selectedLocation.sector} • {selectedLocation.region}
                  </span>
                  <h2 className="text-lg font-black text-slate-800 mt-1">
                    {selectedLocation.name}
                  </h2>
                  <span className="text-[11px] text-slate-400">
                    Pembaruan: {selectedLocation.lastUpdated}
                  </span>
                </div>
                <span className={selectedLocation.riskBadgeClass}>
                  {selectedLocation.riskLabel}
                </span>
              </div>

              {/* Water Quality Score Gauge */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Skor Kualitas Air (WQI)
                  </span>
                  <span className="text-2xl font-black text-cyan-400">
                    {selectedLocation.waterScore}{' '}
                    <span className="text-xs text-slate-400 font-normal">/ 100</span>
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm ${
                    selectedLocation.waterScore >= 80
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : selectedLocation.waterScore >= 60
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {selectedLocation.waterScore >= 80
                    ? 'BAIK'
                    : selectedLocation.waterScore >= 60
                    ? 'SEDANG'
                    : 'BURUK'}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                💬 {selectedLocation.description}
              </p>

              {/* Parameter Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Oksigen (DO)</span>
                  <span className="font-bold text-slate-800">
                    {selectedLocation.metrics.do} mg/L
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Keasaman (pH)</span>
                  <span className="font-bold text-slate-800">
                    {selectedLocation.metrics.ph}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Keruhan</span>
                  <span className="font-bold text-slate-800">
                    {selectedLocation.metrics.turbidity} NTU
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Suhu Air</span>
                  <span className="font-bold text-slate-800">
                    {selectedLocation.metrics.temp} °C
                  </span>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex gap-2">
                <a
                  href={`/dashboard?sector=${selectedLocation.sector}`}
                  className="w-full py-2.5 text-center rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-700 transition-colors"
                >
                  Lihat Analytics Sektor &rarr;
                </a>
              </div>
            </div>
          ) : (
            <div className="card-base p-8 text-center text-slate-400">
              <p className="text-2xl mb-2">🗺️</p>
              <p className="text-xs font-bold">Pilih salah satu titik di peta untuk melihat rincian.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}