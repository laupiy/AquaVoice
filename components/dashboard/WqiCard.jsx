'use client';

import React from 'react';
import { calculateWQI } from '@/lib/waterQuality';

export default function WqiCard({ waterData }) {
  const wqi = calculateWQI(waterData);

  return (
    <div className="card-base p-6 relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-cyan-50/30">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Water Quality Index (WQI)
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-1">
            Indeks Kelayakan Air
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Diukur real-time berdasarkan 6 parameter fisik & kimia
          </p>
        </div>
        <span className={wqi.badgeClass}>
          {wqi.category}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        {/* Ring Visual Score */}
        <div className="relative flex items-center justify-center w-28 h-28">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={
                wqi.riskLevel === 'SAFE'
                  ? 'text-emerald-500'
                  : wqi.riskLevel === 'WARNING'
                  ? 'text-amber-500'
                  : 'text-rose-500'
              }
              strokeDasharray={`${wqi.score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-3xl font-black text-slate-800 block leading-none">
              {wqi.score}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
          </div>
        </div>

        {/* Insight Summary */}
        <div className="flex-1 space-y-2.5">
          <div className="p-3 rounded-xl bg-white/80 border border-slate-100 shadow-sm">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Status Perairan: </span>
              {wqi.score >= 75
                ? 'Aman untuk aktivitas perikanan, budidaya tambak, dan pelayaran.'
                : wqi.score >= 50
                ? 'Perlu pengawasan. Terdeteksi perubahan indikator sekunder.'
                : 'Peringatan krisis air! Segera terapkan Prosedur SOP Mitigasi.'}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div>📍 <span className="font-medium text-slate-700">Lokasi:</span> Teluk Pesisir Utama</div>
            <div>⏱️ <span className="font-medium text-slate-700">Update:</span> Baru Saja</div>
          </div>
        </div>
      </div>
    </div>
  );
}