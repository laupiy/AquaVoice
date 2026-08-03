import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react'
import { statusLabel, statusDotClass } from './mapStatus'

const statusOrder = ['safe', 'warning', 'critical']

export default function MapFilterPanel({
  search,
  onSearchChange,
  statusFilter,
  onToggleStatus,
  river,
  onRiverChange,
  rivers,
  stations,
  selectedId,
  onSelectStation,
  onReset,
}) {
  return (
    <div className="rounded-2xl bg-white border border-mist-200 flex flex-col h-[420px] sm:h-[560px] xl:h-[680px]">
      <div className="p-5 border-b border-mist-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-abyss-950 flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-current-600" />
            Filter Sensor
          </h3>
          <button
            onClick={onReset}
            className="text-xs font-medium text-slate-ink/45 hover:text-current-600 flex items-center gap-1 transition-colors duration-200"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-ink/35" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari stasiun atau sungai..."
            className="w-full rounded-xl border border-mist-200 bg-mist-50 pl-9 pr-3 py-2 text-sm text-abyss-950 placeholder:text-slate-ink/35 focus:outline-none focus:ring-2 focus:ring-current-400/40 focus:border-current-400"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {statusOrder.map((s) => (
            <button
              key={s}
              onClick={() => onToggleStatus(s)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-all duration-200
                ${
                  statusFilter.has(s)
                    ? 'bg-abyss-950 border-abyss-950 text-white'
                    : 'bg-white border-mist-200 text-slate-ink/50 hover:border-current-300'
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${statusDotClass[s]}`} />
              {statusLabel[s]}
            </button>
          ))}
        </div>

        <select
          value={river}
          onChange={(e) => onRiverChange(e.target.value)}
          className="w-full rounded-xl border border-mist-200 bg-mist-50 px-3 py-2 text-sm text-abyss-950 focus:outline-none focus:ring-2 focus:ring-current-400/40 focus:border-current-400"
        >
          <option value="all">Semua sungai / badan air</option>
          {rivers.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-ink/35">
          {stations.length} stasiun ditemukan
        </p>

        {stations.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-slate-ink/45">
            Tidak ada stasiun sesuai filter.
          </p>
        )}

        <div className="space-y-1">
          {stations.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectStation(s.id)}
              className={`w-full text-left rounded-xl px-3 py-2.5 border transition-colors duration-200
                ${
                  selectedId === s.id
                    ? 'bg-current-500/10 border-current-300/50'
                    : 'bg-white border-transparent hover:bg-mist-50'
                }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-abyss-950 truncate">{s.name}</p>
                <span className={`shrink-0 w-2 h-2 rounded-full ${statusDotClass[s.status]}`} />
              </div>
              <p className="text-xs text-slate-ink/45 font-mono-data mt-0.5">
                pH {s.current.ph} &middot; {s.current.temperature}&deg;C
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
