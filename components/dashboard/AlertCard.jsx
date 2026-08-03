'use client';

import { AlertTriangle, Clock } from 'lucide-react';
import { ALERT_LEVEL_LABELS, alertLevelStyles, formatDate } from '@/utils/helpers';

export default function AlertCard({ alert }) {
  return (
    <div
      className={`p-3 rounded-xl border-l-4 border border-mist-200 ${alertLevelStyles[alert.level] || alertLevelStyles.warning}`}
    >
      <div className="flex items-start gap-2.5">
        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-abyss-950 truncate">{alert.stationName}</p>
            <span className="text-[11px] font-semibold uppercase shrink-0">
              {ALERT_LEVEL_LABELS[alert.level]}
            </span>
          </div>
          <p className="text-xs text-slate-ink/60 mt-1 line-clamp-2">{alert.message}</p>
          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-slate-ink/40">
            <Clock size={11} />
            {formatDate(alert.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}
