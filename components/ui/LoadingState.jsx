'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Memuat data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 className="w-8 h-8 text-current-500 animate-spin" />
      <p className="text-sm text-slate-ink/55">{message}</p>
    </div>
  );
}
