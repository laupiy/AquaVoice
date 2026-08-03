'use client';

import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'Tidak ada data', description = 'Belum ada data untuk ditampilkan.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="grid place-items-center w-14 h-14 rounded-2xl bg-mist-100 text-slate-ink/35">
        <Inbox size={24} />
      </div>
      <h3 className="font-display font-bold text-abyss-950">{title}</h3>
      <p className="text-sm text-slate-ink/55 max-w-sm">{description}</p>
    </div>
  );
}
