import { MapPin, CalendarClock, RotateCcw } from 'lucide-react'

const statusOrder = ['safe', 'warning', 'critical']
const statusLabel = { safe: 'Aman', warning: 'Waspada', critical: 'Bahaya' }
const statusDot = { safe: 'bg-current-500', warning: 'bg-caution', critical: 'bg-critical' }

export default function MonitoringFilterBar({
  locations,
  location,
  onLocationChange,
  timeOptions,
  time,
  onTimeChange,
  statusFilter,
  onToggleStatus,
  onReset,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-ink/35 pointer-events-none" />
        <select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="rounded-xl border border-mist-200 bg-white pl-8 pr-7 py-2 text-sm text-abyss-950 focus:outline-none focus:ring-2 focus:ring-current-400/40 focus:border-current-400 transition-shadow duration-200"
        >
          <option value="all">Semua Lokasi</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <CalendarClock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-ink/35 pointer-events-none" />
        <select
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="rounded-xl border border-mist-200 bg-white pl-8 pr-7 py-2 text-sm text-abyss-950 focus:outline-none focus:ring-2 focus:ring-current-400/40 focus:border-current-400 transition-shadow duration-200"
        >
          {timeOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        {statusOrder.map((s) => (
          <button
            key={s}
            onClick={() => onToggleStatus(s)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all duration-200
              ${
                statusFilter.has(s)
                  ? 'bg-abyss-950 border-abyss-950 text-white'
                  : 'bg-white border-mist-200 text-slate-ink/50 hover:border-current-300'
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${statusDot[s]}`} />
            {statusLabel[s]}
          </button>
        ))}
      </div>

      <button
        onClick={onReset}
        className="ml-auto text-xs font-medium text-slate-ink/45 hover:text-current-600 flex items-center gap-1 transition-colors duration-200"
      >
        <RotateCcw size={12} /> Reset Filter
      </button>
    </div>
  )
}
