'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import ReportStatusBadge from '@/components/ui/ReportStatusBadge';
import ReportProgress from '@/components/report/ReportProgress';
import { formatDate } from '@/utils/helpers';
import { REPORT_STATUS as STATUS_MAP } from '@/lib/validations';

export default function ReportDetailView({ report }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/my-reports"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-current-600 hover:text-current-700"
      >
        <ArrowLeft size={16} />
        Kembali
      </Link>

      <div className="rounded-2xl bg-white border border-mist-200 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-mono-data text-slate-ink/45">{report.reportNumber}</p>
            <h2 className="font-display font-bold text-xl text-abyss-950 mt-1">{report.title}</h2>
          </div>
          <ReportStatusBadge status={report.status} />
        </div>

        <div className="mt-6">
          <ReportProgress currentStatus={report.status} />
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <p className="text-xs text-slate-ink/45 uppercase tracking-wider">Kategori</p>
            <p className="text-sm font-medium text-abyss-950 mt-0.5">{report.category}</p>
          </div>

          <div>
            <p className="text-xs text-slate-ink/45 uppercase tracking-wider">Deskripsi</p>
            <p className="text-sm text-slate-ink/70 mt-0.5 leading-relaxed">{report.description}</p>
          </div>

          {report.voiceNote && (
            <div>
              <p className="text-xs text-slate-ink/45 uppercase tracking-wider">Voice Note</p>
              <p className="text-sm text-slate-ink/70 mt-0.5 italic">{report.voiceNote}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {report.location && (
              <div className="flex items-center gap-1.5 text-sm text-slate-ink/55">
                <MapPin size={14} />
                {report.location}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-sm text-slate-ink/55">
              <Clock size={14} />
              {formatDate(report.createdAt)}
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-ink/45 uppercase tracking-wider">Status Saat Ini</p>
            <p className="text-sm font-semibold text-current-600 mt-0.5">
              {STATUS_MAP[report.status]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
