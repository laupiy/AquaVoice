'use client';

const steps = [
  { key: 'menunggu_verifikasi', label: 'Menunggu Verifikasi' },
  { key: 'diverifikasi', label: 'Diverifikasi' },
  { key: 'sedang_ditangani', label: 'Sedang Ditangani' },
  { key: 'selesai', label: 'Selesai' },
];

export default function ReportProgress({ currentStatus }) {
  const currentIndex = steps.findIndex((s) => s.key === currentStatus);

  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step, i) => {
        const isActive = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step.key} className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center w-full">
              {i > 0 && (
                <div
                  className={`flex-1 h-0.5 ${isActive ? 'bg-current-500' : 'bg-mist-200'}`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full grid place-items-center text-xs font-bold shrink-0 ${
                  isCurrent
                    ? 'bg-current-500 text-white ring-4 ring-current-500/20'
                    : isActive
                      ? 'bg-current-500 text-white'
                      : 'bg-mist-200 text-slate-ink/40'
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 ${i < currentIndex ? 'bg-current-500' : 'bg-mist-200'}`}
                />
              )}
            </div>
            <p
              className={`text-[10px] sm:text-xs text-center font-medium ${
                isActive ? 'text-current-600' : 'text-slate-ink/40'
              }`}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
