'use client';

import React, { useState } from 'react';

export default function WaterChart() {
  const [selectedMetric, setSelectedMetric] = useState('wqi');

  // Dummy data 7 hari historis + 3 hari prediksi
  const chartData = [
    { day: 'Sen', val: 88, isForecast: false },
    { day: 'Sel', val: 85, isForecast: false },
    { day: 'Rab', val: 82, isForecast: false },
    { day: 'Kam', val: 90, isForecast: false },
    { day: 'Jum', val: 87, isForecast: false },
    { day: 'Sab', val: 84, isForecast: false },
    { day: 'Min (Hari Ini)', val: 82, isForecast: false },
    { day: 'Sen (H+1)', val: 80, isForecast: true },
    { day: 'Sel (H+2)', val: 78, isForecast: true },
    { day: 'Rab (H+3)', val: 85, isForecast: true },
  ];

  return (
    <div className="card-base p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Analisis Prediktif
          </span>
          <h3 className="text-lg font-bold text-slate-800">
            Tren Kualitas Air & Prediksi 3 Hari Ke Depan
          </h3>
        </div>

        {/* Metric Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setSelectedMetric('wqi')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedMetric === 'wqi' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Skor WQI
          </button>
          <button
            onClick={() => setSelectedMetric('do')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedMetric === 'do' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            DO (Oksigen)
          </button>
        </div>
      </div>

      {/* Visual Line / Bar Chart */}
      <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
            <span className="text-[10px] font-bold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.val}
            </span>
            <div
              style={{ height: `${item.val}%` }}
              className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                item.isForecast
                  ? 'bg-gradient-to-t from-cyan-300 to-blue-400 border-2 border-dashed border-cyan-500/50'
                  : 'bg-gradient-to-t from-cyan-500 to-blue-600'
              }`}
            />
            <span className={`text-[9px] font-semibold mt-2 truncate max-w-full ${item.isForecast ? 'text-cyan-600 font-bold' : 'text-slate-400'}`}>
              {item.day}
            </span>
          </div>
        ))}
      </div>

      {/* Legend & Prediction Insight Card */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-600" />
            <span>Data Historis (7 Hari)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-300 border border-dashed border-cyan-500" />
            <span>Prediksi AI (3 Hari)</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-800 font-medium">
          💡 <span className="font-bold">Insight Nelayan:</span> Tren diproyeksikan stabil pada H+3. Aman untuk penebaran bibit.
        </div>
      </div>
    </div>
  );
}