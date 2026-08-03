'use client';

import React from 'react';
import { evaluateWaterRecommendations } from '@/lib/mitigationSop';

export default function AutoRecommendation({ waterData }) {
  const recommendations = evaluateWaterRecommendations(waterData);

  return (
    <div className="card-base p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-lg">⚡</span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
              Smart Engine Mitigation Trigger
            </span>
            <h3 className="text-lg font-bold text-white">
              Rekomendasi Aksi Otomatis Real-time
            </h3>
          </div>
        </div>
        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-semibold border border-cyan-500/30">
          {recommendations.length} Rekomendasi Aktif
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={rec.badgeClass}>{rec.priority}</span>
                <h4 className="text-sm font-bold text-white mt-1.5">{rec.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{rec.action}</p>
                <p className="text-[11px] text-cyan-400 mt-2 font-mono">
                  📍 {rec.targetParam}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}