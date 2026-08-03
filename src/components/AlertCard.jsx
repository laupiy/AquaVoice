import { AlertTriangle, AlertOctagon, Info } from 'lucide-react'

const levelConfig = {
  critical: { icon: AlertOctagon, ring: 'text-critical bg-critical/10', label: 'Kritis' },
  warning: { icon: AlertTriangle, ring: 'text-caution bg-caution/10', label: 'Perhatian' },
  info: { icon: Info, ring: 'text-flow-600 bg-flow-500/10', label: 'Info' },
}

function timeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 60) return `${mins} menit lalu`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} jam lalu`
  return `${Math.round(hours / 24)} hari lalu`
}

export default function AlertCard({ alert }) {
  const config = levelConfig[alert.level] || levelConfig.info
  const Icon = config.icon

  return (
    <div className="flex gap-3.5 p-4 rounded-xl border border-mist-200 bg-white hover:border-current-300 transition-colors">
      <div className={`shrink-0 grid place-items-center w-9 h-9 rounded-lg ${config.ring}`}>
        <Icon size={17} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-abyss-950 truncate">{alert.station}</p>
          <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.ring}`}>
            {config.label}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-ink/65 leading-snug">{alert.message}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-ink/40">
          <span>{alert.parameter}</span>
          <span>&middot;</span>
          <span>{timeAgo(alert.timestamp)}</span>
        </div>
      </div>
    </div>
  )
}
