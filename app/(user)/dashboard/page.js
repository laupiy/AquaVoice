'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WqiCard from '@/components/dashboard/WqiCard';
import ParameterGrid from '@/components/dashboard/ParameterGrid';
import RiskMatrix5x5 from '@/components/dashboard/RiskMatrix5x5';
import WaterChart from '@/components/dashboard/WaterChart';

export default function UserDashboardPage() {
  // Mock Data Kualitas Air Realistis Pesisir
  const [waterData] = useState({
    ph: 7.8,
    temperature: 29.5,
    do: 6.2,
    turbidity: 3.2,
    salinity: 32.0,
    conductivity: 48.5,
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Welcome Banner */}
      <div className="card-base p-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white shadow-lg shadow-cyan-500/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              Monitoring System Live
            </span>
            <h1 className="text-2xl font-black mt-2">Selamat Pagi, Tim Pesisir 👋</h1>
            <p className="text-xs text-cyan-100 mt-1 max-w-xl">
              Pantau kondisi kualitas air, tingkat risiko lingkungan, dan akses panduan mitigasi darurat secara otomatis.
            </p>
          </div>
          <Link
            href="/report"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-cyan-800 font-bold text-sm shadow-md hover:bg-cyan-50 transition-colors shrink-0"
          >
            <span>🎙️</span>
            <span>Buat Laporan Suara</span>
          </Link>
        </div>
      </div>

      {/* Section 1: Skor WQI & 6 Parameter Grid */}
      <WqiCard waterData={waterData} />
      <ParameterGrid waterData={waterData} />

      {/* Section 2: Smart Risk Matrix (5x5) */}
      <RiskMatrix5x5 currentProbability={2} currentImpact={2} />

      {/* Section 3: Predictive Trend Chart */}
      <WaterChart />
    </div>
  );
}