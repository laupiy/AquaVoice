'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoiceRecorder from '@/components/report/VoiceRecorder';
import { generateAiSummary } from '@/lib/aiSummary';

export default function ReportPage() {
  const router = useRouter();
  const [transcript, setTranscript] = useState('');
  const [location, setLocation] = useState('Pesisir Teluk Utara, Sektor 2');
  const [reporterName, setReporterName] = useState('Pak Budi (Nelayan)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Dynamic AI Summary
  const aiResult = generateAiSummary(transcript);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transcript.trim()) {
      alert('Silakan rekam suara atau ketik deskripsi laporan terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);

    // Simulasikan pembuatan laporan baru
    setTimeout(() => {
      const newReport = {
        id: `REP-${Date.now().toString().slice(-4)}`,
        reporterName,
        location,
        transcript,
        aiSummary: aiResult,
        status: 'SUBMITTED',
        createdAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Simpan ke LocalStorage dummy
      const existing = JSON.parse(localStorage.getItem('aquavoice_reports') || '[]');
      localStorage.setItem('aquavoice_reports', JSON.stringify([newReport, ...existing]));

      setIsSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto card-base p-8 text-center space-y-4 my-8 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
          🎉
        </div>
        <h2 className="text-2xl font-black text-slate-800">Laporan Berhasil Terkirim!</h2>
        <p className="text-xs text-slate-600">
          Terima kasih atas kepedulian Anda. Laporan telah masuk ke sistem dan akan diverifikasi oleh Admin.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => router.push('/my-reports')}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-700 transition-colors"
          >
            Pelacak Status Laporan Saya &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
          Crowdsourced Citizen Reporting
        </span>
        <h1 className="text-2xl font-black text-slate-800 mt-1">Lapor Kejadian Perairan</h1>
        <p className="text-xs text-slate-500">
          Laporkan tumpahan limbah, kematian ikan, atau keanehan warna air menggunakan suara Anda.
        </p>
      </div>

      {/* Voice Recorder Component */}
      <VoiceRecorder
        onTranscriptChange={(text) => setTranscript(text)}
        onAudioRecorded={() => {}}
      />

      {/* Main Report Form */}
      <form onSubmit={handleSubmit} className="card-base p-6 space-y-6">
        {/* Transcript Textarea Edit */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Transkrip Teks Laporan (Dapat Disunting Manual)
          </label>
          <textarea
            rows="4"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Hasil ucapan suara Anda akan muncul di sini secara otomatis..."
            className="input-base"
          />
        </div>

        {/* Live AI Summary Preview Card */}
        {aiResult && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                ⚡ Analisis Otomatis AI Summary
              </span>
              <span className={aiResult.severityInfo.class}>
                {aiResult.severityInfo.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">Potensi Isu:</span>
                <span className="font-bold text-cyan-200">{aiResult.possibleIssue}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Kategori:</span>
                <span className="font-bold text-slate-200">{aiResult.category}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 pt-1">
              💡 <span className="font-semibold">Rekomendasi Aksi:</span> {aiResult.suggestedAction}
            </p>
          </div>
        )}

        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Pelapor / Nelayan
            </label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              className="input-base"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Lokasi Perairan Kejadian
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-base"
            >
              <option value="Pesisir Teluk Utara, Sektor 2">Pesisir Teluk Utara, Sektor 2</option>
              <option value="Muara Sungai Angke, Sektor 1">Muara Sungai Angke, Sektor 1</option>
              <option value="Tambak Buleleng, Sektor 4">Tambak Buleleng, Sektor 4</option>
              <option value="Pantai Kenjeran, Sektor 3">Pantai Kenjeran, Sektor 3</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? 'Mengirim Laporan...' : 'Kirim Laporan Ke Sistem AquaVoice'}
        </button>
      </form>
    </div>
  );
}