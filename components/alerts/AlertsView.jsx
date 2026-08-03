'use client';

import { useState } from 'react';
import AlertCard from '@/components/dashboard/AlertCard';
import EmptyState from '@/components/ui/EmptyState';

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'safe', label: '🟢 Aman' },
  { key: 'warning', label: '🟡 Waspada' },
  { key: 'critical', label: '🔴 Bahaya' },
];

export default function AlertsView({ alerts }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.level === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
              filter === f.key
                ? 'bg-current-500 border-current-500 text-white'
                : 'bg-white border-mist-200 text-slate-ink/55 hover:border-current-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
        {filtered.length === 0 ? (
          <EmptyState title="Tidak ada alert" description="Tidak ada notifikasi untuk filter ini." />
        ) : (
          <div className="space-y-3">
            {filtered.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
