'use client';

import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import ReportStatusBadge from '@/components/ui/ReportStatusBadge';
import { formatDate } from '@/utils/helpers';
import EmptyState from '@/components/ui/EmptyState';

export default function MyReportsView({ reports }) {
  if (reports.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-mist-200 p-6">
        <EmptyState
          title="Belum ada laporan"
          description="Anda belum mengirimkan laporan. Mulai laporkan kondisi air di sekitar Anda."
        />
        <div className="text-center mt-4">
          <Link
            href="/report"
            className="inline-flex px-5 py-2.5 rounded-xl bg-current-500 text-white font-semibold text-sm"
          >
            Buat Laporan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Link
          key={report.id}
          href={`/my-reports/${report.id}`}
          className="rounded-2xl bg-white border border-mist-200 p-5 hover:shadow-[0_8px_28px_-12px_rgba(11,42,66,0.18)] transition-shadow"
        >
          <div className="aspect-video rounded-xl bg-gradient-to-br from-current-400/20 to-flow-400/20 grid place-items-center mb-4">
            <MapPin size={28} className="text-current-600" />
          </div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-abyss-950 text-sm line-clamp-2">{report.title}</h3>
            <ReportStatusBadge status={report.status} />
          </div>
          <p className="text-xs text-slate-ink/50 mt-1 truncate">{report.location || report.category}</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-ink/40">
            <Clock size={11} />
            {formatDate(report.createdAt)}
          </div>
        </Link>
      ))}
    </div>
  );
}
