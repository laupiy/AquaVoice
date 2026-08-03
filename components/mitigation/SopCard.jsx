'use client';

import React, { useState } from 'react';

export default function SopCard({ sop }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-base p-5 transition-all hover:border-cyan-300">
      {/* SOP Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {sop.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={sop.badgeClass}>{sop.severity}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {sop.category}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-1">{sop.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{sop.summary}</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
        >
          {isOpen ? 'Tutup SOP ▲' : 'Buka Tahapan SOP ▼'}
        </button>
      </div>

      {/* Accordion Content Steps */}
      {isOpen && (
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Langkah Penanganan Taktis Berurutan:
          </h4>

          <div className="space-y-3">
            {sop.steps.map((st) => (
              <div key={st.step} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {st.step}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">{st.title}</h5>
                  <p className="text-xs text-slate-600 mt-0.5">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Call Action */}
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-rose-800">
              🚨 Hubungi Posko Tanggap Bencana Terdekat:
            </span>
            <span className="font-bold text-rose-900 bg-white px-3 py-1 rounded-lg border border-rose-200">
              {sop.emergencyContact}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}