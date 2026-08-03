'use client';

import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message = 'Terjadi kesalahan', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="grid place-items-center w-14 h-14 rounded-2xl bg-critical/10 text-critical">
        <AlertCircle size={24} />
      </div>
      <h3 className="font-display font-bold text-abyss-950">Oops!</h3>
      <p className="text-sm text-slate-ink/55 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm font-semibold text-current-600 hover:text-current-700"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}
