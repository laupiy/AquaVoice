'use client';

import React from 'react';

export default function MapFilter({
  searchQuery,
  setSearchQuery,
  selectedRisk,
  setSelectedRisk,
  selectedSector,
  setSelectedSector,
  sectors,
}) {
  return (
    <div className="card-base p-4 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari nama lokasi perairan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-9 text-xs"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>

        {/* Sector Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-600 whitespace-nowrap">
            Wilayah:
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="input-base text-xs py-2"
          >
            <option value="ALL">Semua Sektor</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Risk Level Badges Filter */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-100 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0">
          Status Risiko:
        </span>
        {[
          { key: 'ALL', label: 'Semua Status', class: 'bg-slate-100 text-slate-700' },
          { key: 'SAFE', label: '🟢 Aman', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { key: 'WARNING', label: '🟡 Waspada', class: 'bg-amber-50 text-amber-700 border-amber-200' },
          { key: 'DANGER', label: '🔴 Bahaya', class: 'bg-rose-50 text-rose-700 border-rose-200' },
        ].map((risk) => (
          <button
            key={risk.key}
            onClick={() => setSelectedRisk(risk.key)}
            className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all shrink-0 ${
              selectedRisk === risk.key
                ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm scale-105'
                : `${risk.class} hover:opacity-80`
            }`}
          >
            {risk.label}
          </button>
        ))}
      </div>
    </div>
  );
}