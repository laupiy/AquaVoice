'use client';

import { MapPin, Clock } from 'lucide-react';
import ReportStatusBadge from '@/components/ui/ReportStatusBadge';
import { formatDate } from '@/utils/helpers';

export default function ReportCard({ report }) {
  return (
    <div className="flex gap-3 p-3 rounded-xl border border-mist-200 hover:bg-mist-50 transition-colors">
      <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-current-400/20 to-flow-400/20 grid place-items-center">
        <MapPin size={18} className="text-current-600" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-abyss-950 truncate">{report.title}</p>
          <ReportStatusBadge status={report.status} />
        </div>
        <p className="text-xs text-slate-ink/50 mt-0.5 truncate">{report.location || report.category}</p>
        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-slate-ink/40">
          <Clock size={11} />
          {formatDate(report.createdAt)}
        </div>
      </div>
    </div>
  );
}
