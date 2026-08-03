'use client';

import React, { useState } from 'react';
import { getRiskMatrixCategory } from '@/lib/waterQuality';

export default function RiskMatrix5x5({ currentProbability = 3, currentImpact = 2 }) {
  const [selectedCell, setSelectedCell] = useState({ prob: currentProbability, imp: currentImpact });

  const activeCategory = getRiskMatrixCategory(selectedCell.prob, selectedCell.imp);

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Smart Risk Matrix (5x5)
          </span>
          <h3 className="text-lg font-bold text-slate-800">
            Matriks Penilaian Risiko Perairan
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500">Kategori Aktif:</span>
          <span className={`px-2.5 py-1 rounded-lg text-white font-bold ${activeCategory.bg}`}>
            {activeCategory.level}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Grid 5x5 Interactive Matrix */}
        <div className="md:col-span-8 overflow-x-auto">
          <div className="min-w-[320px]">
            {/* Axis Label Top */}
            <p className="text-[10px] font-bold uppercase tracking-wider text-center text-slate-400 mb-1">
              &larr; Tingkat Dampak Ekosistem (Impact 1 - 5) &rarr;
            </p>

            <div className="grid grid-cols-5 gap-1.5 p-2 bg-slate-100/80 rounded-2xl border border-slate-200/80">
              {[5, 4, 3, 2, 1].map((prob) =>
                [1, 2, 3, 4, 5].map((imp) => {
                  const cellRisk = getRiskMatrixCategory(prob, imp);
                  const isActive = selectedCell.prob === prob && selectedCell.imp === imp;
                  const isCurrentCondition = currentProbability === prob && currentImpact === imp;

                  return (
                    <button
                      key={`${prob}-${imp}`}
                      onClick={() => setSelectedCell({ prob, imp })}
                      className={`h-12 rounded-xl transition-all relative flex flex-col items-center justify-center font-bold text-xs ${
                        cellRisk.riskKey === 'SAFE'
                          ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                          : cellRisk.riskKey === 'WARNING'
                          ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                          : 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                      } ${isActive ? 'ring-2 ring-slate-800 shadow-md scale-95' : 'opacity-85 hover:opacity-100'}`}
                    >
                      <span className="text-[10px] opacity-60">P{prob}xI{imp}</span>
                      {isCurrentCondition && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-600 border-2 border-white rounded-full animate-bounce" title="Kondisi Perairan Saat Ini" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-center text-slate-400 mt-1">
              &uarr; Probabilitas Kejadian Anomali (Probability 1 - 5) &darr;
            </p>
          </div>
        </div>

        {/* Info Detail Cell Selected */}
        <div className="md:col-span-4 space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Detail Sel Terpilih (P{selectedCell.prob} x I{selectedCell.imp})
            </h4>
            <p className="text-sm font-bold text-slate-800 mt-1">
              Skor Risiko: {selectedCell.prob * selectedCell.imp} / 25
            </p>
            <p className="text-xs text-slate-600 mt-2">
              {selectedCell.prob * selectedCell.imp <= 4
                ? 'Kondisi perairan stabil. Tidak diperlukan intervensi khusus.'
                : selectedCell.prob * selectedCell.imp <= 9
                ? 'Terdeteksi potensi risiko sedang. Disarankan pemantauan berkala.'
                : 'Risiko tinggi hingga kritis! Aktifkan SOP aksi mitigasi otomatis.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-cyan-50/60 border border-cyan-100 text-xs text-cyan-900 flex items-center gap-2">
            <span className="text-base">💡</span>
            <span>Klik pada kotak matriks untuk mensimulasikan skenario risiko lainnya.</span>
          </div>
        </div>
      </div>
    </div>
  );
}