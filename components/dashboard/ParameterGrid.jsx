'use client';

import React from 'react';
import { PARAMETER_THRESHOLD } from '@/lib/waterQuality';

export default function ParameterGrid({ waterData }) {
  const parameters = [
    { key: 'ph', icon: '🧪', value: waterData.ph, trend: '+0.1', isNormal: waterData.ph >= 6.5 && waterData.ph <= 8.5 },
    { key: 'do', icon: '🫧', value: waterData.do, trend: '-0.3', isNormal: waterData.do >= 5.0 },
    { key: 'temperature', icon: '🌡️', value: waterData.temperature, trend: '+0.5', isNormal: waterData.temperature >= 28 && waterData.temperature <= 32 },
    { key: 'turbidity', icon: '🌊', value: waterData.turbidity, trend: '-0.1', isNormal: waterData.turbidity <= 5.0 },
    { key: 'salinity', icon: '🧂', value: waterData.salinity, trend: '0.0', isNormal: waterData.salinity >= 30 && waterData.salinity <= 34 },
    { key: 'conductivity', icon: '⚡', value: waterData.conductivity, trend: '+0.2', isNormal: waterData.conductivity >= 45 && waterData.conductivity <= 55 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {parameters.map((param) => {
        const threshold = PARAMETER_THRESHOLD[param.key];
        return (
          <div
            key={param.key}
            className={`card-base p-3.5 transition-all ${
              !param.isNormal ? 'border-amber-300 bg-amber-50/20' : 'hover:border-cyan-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">{param.icon}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  param.isNormal ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {param.isNormal ? 'Normal' : 'Anomali'}
              </span>
            </div>

            <div className="mt-2">
              <p className="text-[11px] font-semibold text-slate-500 truncate">{threshold.name}</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-black text-slate-800">{param.value}</span>
                <span className="text-[10px] font-bold text-slate-400">{threshold.unit}</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Baku: {threshold.min}-{threshold.max}</span>
              <span className="font-semibold text-slate-600">{param.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}