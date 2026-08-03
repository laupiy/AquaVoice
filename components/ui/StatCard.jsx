import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const variants = {
  current: 'bg-current-500/10 text-current-600',
  flow: 'bg-flow-500/10 text-flow-600',
  caution: 'bg-caution/10 text-caution',
  critical: 'bg-critical/10 text-critical',
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  delta,
  deltaLabel,
  trendDirection = 'up',
  variant = 'current',
  showRipple = false,
}) {
  const isPositiveTrend = trendDirection === 'up';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-mist-200 p-5 hover:shadow-[0_8px_28px_-12px_rgba(11,42,66,0.18)] transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-ink/55 font-medium">{label}</p>
          <p className="mt-2 font-mono-data font-semibold text-3xl text-abyss-950">
            {value}
            {unit && <span className="text-base font-medium text-slate-ink/45 ml-1">{unit}</span>}
          </p>
        </div>
        <div className={`relative grid place-items-center w-11 h-11 rounded-xl ${variants[variant]}`}>
          {showRipple && <span className="ripple absolute" />}
          <Icon size={20} strokeWidth={2.1} />
        </div>
      </div>

      {delta !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`flex items-center gap-0.5 ${
              isPositiveTrend ? 'text-current-600' : 'text-critical'
            }`}
          >
            {isPositiveTrend ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {delta}
          </span>
          {deltaLabel && <span className="text-slate-ink/45">{deltaLabel}</span>}
        </div>
      )}
    </div>
  );
}
