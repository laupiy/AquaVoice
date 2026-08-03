'use client';

import React, { useState } from 'react';
import AutoRecommendation from '@/components/mitigation/AutoRecommendation';
import SopCard from '@/components/mitigation/SopCard';
import { MITIGATION_SOPS } from '@/lib/mitigationSop';

export default function MitigationCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy kondisi air terhubung dari sensor untuk AutoRecommendation
  const [currentWaterData] = useState({
    ph: 7.8,
    temperature: 29.5,
    do: 4.2, // Anomali DO memicu rekomendasi darurat
    turbidity: 6.1, // Anomali Keruhan
    salinity: 32.0,
    conductivity: 48.5,
  });

  // Filter SOP logic
  const filteredSops = MITIGATION_SOPS.filter((sop) => {
    const matchesCategory =
      selectedCategory === 'ALL' || sop.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
          Smart Mitigation & SOP Action Plan
        </span>
        <h1 className="text-2xl font-black text-slate-800 mt-1">Pusat Mitigasi Pintar Perairan</h1>
        <p className="text-xs text-slate-500">
          Panduan SOP taktis penanganan darurat dan rekomendasi tindakan otomatis berbasis kondisi indikator air.
        </p>
      </div>

      {/* Auto Triggered Recommendation Component */}
      <AutoRecommendation waterData={currentWaterData} />

      {/* Search & Category Filter Bar */}
      <div className="card-base p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari SOP (misal: minyak, ikan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-9"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Pencemaran Kimia', 'Ekosistem', 'Biologi Laut', 'Fisik Air'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'Semua SOP' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* SOP List Grid */}
      <div className="space-y-4">
        {filteredSops.length === 0 ? (
          <div className="card-base p-12 text-center text-slate-400">
            <p className="text-2xl mb-2">📖</p>
            <p className="text-sm font-bold">Tidak ada SOP yang cocok dengan pencarian Anda.</p>
          </div>
        ) : (
          filteredSops.map((sop) => <SopCard key={sop.id} sop={sop} />)
        )}
      </div>
    </div>
  );
}