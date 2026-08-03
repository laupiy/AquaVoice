'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { REPORT_STATUS } from '@/lib/validations';

function SuccessContent() {
  const searchParams = useSearchParams();
  const reportNumber = searchParams.get('number') || 'AV-2026-00001';

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="rounded-2xl bg-white border border-mist-200 p-8 sm:p-10">
        <div className="grid place-items-center w-16 h-16 rounded-full bg-current-500/10 text-current-600 mx-auto mb-5">
          <CheckCircle size={32} />
        </div>

        <h2 className="font-display font-extrabold text-2xl text-abyss-950">
          Laporan Berhasil Dikirim
        </h2>
        <p className="mt-2 text-sm text-slate-ink/55">
          Terima kasih atas kontribusi Anda dalam menjaga kualitas air.
        </p>

        <div className="mt-6 rounded-xl bg-mist-50 border border-mist-200 p-5 text-left space-y-3">
          <div>
            <p className="text-xs text-slate-ink/45 uppercase tracking-wider">Nomor Laporan</p>
            <p className="font-mono-data font-bold text-lg text-abyss-950 mt-0.5">{reportNumber}</p>
          </div>
          <div>
            <p className="text-xs text-slate-ink/45 uppercase tracking-wider">Status</p>
            <p className="font-semibold text-current-600 mt-0.5">
              {REPORT_STATUS.menunggu_verifikasi}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/my-reports"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-current-500 to-flow-500 text-white font-semibold text-sm"
          >
            Lihat My Reports
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-mist-200 text-abyss-950 font-semibold text-sm hover:border-current-400 transition-colors"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ReportSuccessPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-64 rounded-2xl bg-mist-100" />}>
      <SuccessContent />
    </Suspense>
  );
}
