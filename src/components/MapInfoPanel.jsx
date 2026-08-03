import { MapPin, Droplet, Thermometer, Waves, Wind, CloudFog, Database, FlaskConical, Clock, X } from 'lucide-react'
import { statusLabel, statusBadgeClass } from './mapStatus'

const params = [
  { key: 'ph', label: 'pH', unit: '', icon: Droplet },
  { key: 'temperature', label: 'Suhu', unit: '\u00b0C', icon: Thermometer },
  { key: 'salinity', label: 'Salinitas', unit: 'ppt', icon: Waves },
  { key: 'dissolvedOxygen', label: 'Oksigen Terlarut', unit: 'mg/L', icon: Wind },
  { key: 'turbidity', label: 'Kekeruhan', unit: 'NTU', icon: CloudFog },
  { key: 'tds', label: 'TDS', unit: 'mg/L', icon: Database },
  { key: 'ammonia', label: 'Amonia', unit: 'mg/L', icon: FlaskConical },
]

export default function MapInfoPanel({ station, onClear }) {
  return (
    <div className="rounded-2xl bg-white border border-mist-200 h-[420px] sm:h-[560px] xl:h-[680px] flex flex-col overflow-hidden">
      {!station ? (
        <div className="flex-1 grid place-items-center p-6 text-center">
          <div>
            <span className="mx-auto grid place-items-center w-12 h-12 rounded-xl bg-current-500/10 text-current-600 mb-3">
              <MapPin size={20} />
            </span>
            <p className="font-display font-bold text-abyss-950">Belum ada stasiun dipilih</p>
            <p className="mt-1 text-sm text-slate-ink/50">
              Klik salah satu marker di peta atau pilih dari daftar untuk melihat detail sensor.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-5 border-b border-mist-200">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display font-bold text-abyss-950 leading-tight truncate">{station.name}</p>
                <p className="text-xs text-slate-ink/50 mt-0.5">{station.river}</p>
              </div>
              <button
                onClick={onClear}
                className="shrink-0 grid place-items-center w-7 h-7 rounded-lg text-slate-ink/40 hover:bg-mist-50 hover:text-abyss-950 transition-colors duration-200"
                aria-label="Tutup detail"
              >
                <X size={15} />
              </button>
            </div>

            <span
              className={`inline-flex mt-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusBadgeClass[station.status]}`}
            >
              {statusLabel[station.status]}
            </span>

            <p className="mt-3 text-xs text-slate-ink/40 font-mono-data flex items-center gap-1.5">
              <Clock size={12} />
              Update{' '}
              {new Date(station.lastUpdated).toLocaleString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'short',
              })}
            </p>
            <p className="text-xs text-slate-ink/40 font-mono-data mt-1">
              {station.lat.toFixed(4)}, {station.lng.toFixed(4)}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-1">
            {params.map(({ key, label, unit, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-lg px-2 py-2.5 -mx-2 hover:bg-mist-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-current-500/10 text-current-600">
                    <Icon size={15} />
                  </span>
                  <span className="text-sm text-slate-ink/70">{label}</span>
                </div>
                <span className="font-mono-data text-sm font-semibold text-abyss-950">
                  {station.current[key]} <span className="text-slate-ink/40 font-normal">{unit}</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
