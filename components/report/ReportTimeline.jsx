'use client';

import React from 'react';

export default function ReportTimeline({ currentStatus = 'SUBMITTED' }) {
  const steps = [
    { key: 'SUBMITTED', label: 'Dikirim', icon: '📤', desc: 'Laporan masuk sistem' },
    { key: 'RECEIVED', label: 'Diterima', icon: '📥', desc: 'Diterima admin' },
    { key: 'VERIFYING', label: 'Verifikasi', icon: '🔍', desc: 'Pemeriksaan awal' },
    { key: 'INSPECTING', label: 'Inspeksi', icon: '🚤', desc: 'Tim menuju lokasi' },
    { key: 'RESOLVED', label: 'Selesai', icon: '✅', desc: 'Penanganan tuntas' },
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'SUBMITTED': return 0;
      case 'RECEIVED': return 1;
      case 'VERIFYING': return 2;
      case 'INSPECTING': return 3;
      case 'RESOLVED': return 4;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-cyan-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isPassed = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isCurrent
                    ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 scale-110 shadow-md'
                    : isPassed
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`mt-2 text-xs font-bold ${
                  isCurrent ? 'text-cyan-700' : isPassed ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              <span className="hidden sm:block text-[9px] text-slate-400 max-w-[70px] text-center mt-0.5">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}