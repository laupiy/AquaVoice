'use client';

import React, { useState, useEffect } from 'react';
import ReportTimeline from '@/components/report/ReportTimeline';

export default function MyReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Data bawaan dummy + gabungan data dari localStorage
    const defaultReports = [
      {
        id: 'REP-8821',
        reporterName: 'Pak Budi (Nelayan)',
        location: 'Muara Sungai Angke, Sektor 1',
        transcript: 'Air muara mendadak keruh kehitaman dan tercium bau oli menyengat dekat jembatan.',
        aiSummary: {
          possibleIssue: 'Dugaan Tumpahan Minyak / Limbah B3',
          severityInfo: { label: 'Tinggi (High)', class: 'badge-warning' },
        },
        status: 'INSPECTING',
        createdAt: '03 Aug 2026, 14:20',
      },
      {
        id: 'REP-7710',
        reporterName: 'Pak Budi (Nelayan)',
        location: 'Pesisir Teluk Utara, Sektor 2',
        transcript: 'Banyak ikan tambak kecil mati mengapung di permukaan air.',
        aiSummary: {
          possibleIssue: 'Indikasi Anoksia / Kematian Ikan Massal',
          severityInfo: { label: 'Kritis (Critical)', class: 'badge-danger' },
        },
        status: 'RESOLVED',
        createdAt: '01 Aug 2026, 09:15',
      },
    ];

    const localData = JSON.parse(localStorage.getItem('aquavoice_reports') || '[]');
    setReports([...localData, ...defaultReports]);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
          Tracking & History
        </span>
        <h1 className="text-2xl font-black text-slate-800 mt-1">Laporan Saya</h1>
        <p className="text-xs text-slate-500">
          Pantau proses verifikasi dan tindak lanjut laporan kualitas air Anda secara real-time.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="card-base p-12 text-center text-slate-400">
          <p className="text-2xl mb-2">📥</p>
          <p className="text-sm font-bold">Belum Ada Laporan Terkirim</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="card-base p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div>
                  <span className="text-[10px] font-extrabold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-md">
                    {report.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 mt-1">
                    {report.location}
                  </h3>
                  <span className="text-[11px] text-slate-400">{report.createdAt}</span>
                </div>
                {report.aiSummary?.severityInfo && (
                  <span className={report.aiSummary.severityInfo.class}>
                    {report.aiSummary.severityInfo.label}
                  </span>
                )}
              </div>

              {/* Speech Transcript */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-0.5">🎙️ Transkrip Suara:</span>
                "{report.transcript}"
              </div>

              {/* Progress Timeline Tracking */}
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-500 mb-2">Status Pelacakan Lapangan:</p>
                <ReportTimeline currentStatus={report.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}