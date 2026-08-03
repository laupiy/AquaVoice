import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { MapPinned, Droplet, Thermometer, Waves, Wind, CloudFog } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import './Map.css'
import waterQuality from '../data/waterQuality.json'
import MapFilterPanel from '../components/MapFilterPanel'
import MapInfoPanel from '../components/MapInfoPanel'
import { createStationIcon } from '../components/mapIcons'
import { statusLabel, statusBadgeClass } from '../components/mapStatus'

const BANDUNG_CENTER = [-6.95, 107.55]
const ALL_STATUSES = ['safe', 'warning', 'critical']

function FlyToStation({ station }) {
  const map = useMap()

  useEffect(() => {
    if (station) {
      map.flyTo([station.lat, station.lng], 13, { duration: 0.7 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station?.id])

  return null
}

function popupParams(station) {
  return [
    { label: 'pH', value: station.current.ph, unit: '', icon: Droplet },
    { label: 'Suhu', value: station.current.temperature, unit: '\u00b0C', icon: Thermometer },
    { label: 'Salinitas', value: station.current.salinity, unit: 'ppt', icon: Waves },
    { label: 'DO', value: station.current.dissolvedOxygen, unit: 'mg/L', icon: Wind },
    { label: 'Kekeruhan', value: station.current.turbidity, unit: 'NTU', icon: CloudFog },
  ]
}

export default function MapPage() {
  const { stations } = waterQuality

  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(new Set(ALL_STATUSES))
  const [river, setRiver] = useState('all')

  const rivers = useMemo(() => Array.from(new Set(stations.map((s) => s.river))).sort(), [stations])

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      if (!statusFilter.has(s.status)) return false
      if (river !== 'all' && s.river !== river) return false
      if (search && !`${s.name} ${s.river}`.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [stations, statusFilter, river, search])

  const selectedStation = stations.find((s) => s.id === selectedId) || null

  const toggleStatus = (status) => {
    setStatusFilter((prev) => {
      const next = new Set(prev)
      if (next.has(status)) {
        if (next.size === 1) return prev
        next.delete(status)
      } else {
        next.add(status)
      }
      return next
    })
  }

  const resetFilters = () => {
    setSearch('')
    setStatusFilter(new Set(ALL_STATUSES))
    setRiver('all')
  }

  const safeCount = stations.filter((s) => s.status === 'safe').length
  const warningCount = stations.filter((s) => s.status === 'warning').length
  const criticalCount = stations.filter((s) => s.status === 'critical').length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display font-bold text-abyss-950 text-xl flex items-center gap-2">
            <MapPinned size={20} className="text-current-600" />
            Peta Interaktif
          </h2>
          <p className="text-sm text-slate-ink/50 mt-1">
            Sebaran node sensor kualitas air real-time di DAS Citarum &amp; sekitarnya
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-current-500/10 text-current-600 border border-current-300/30">
            <span className="w-2 h-2 rounded-full bg-current-500" /> {safeCount} Aman
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-caution/10 text-caution border border-caution/30">
            <span className="w-2 h-2 rounded-full bg-caution" /> {warningCount} Waspada
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-critical/10 text-critical border border-critical/30">
            <span className="w-2 h-2 rounded-full bg-critical" /> {criticalCount} Bahaya
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_320px] gap-6 items-start">
        <MapFilterPanel
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onToggleStatus={toggleStatus}
          river={river}
          onRiverChange={setRiver}
          rivers={rivers}
          stations={filteredStations}
          selectedId={selectedId}
          onSelectStation={setSelectedId}
          onReset={resetFilters}
        />

        <div className="rounded-2xl overflow-hidden border border-mist-200 bg-white h-[420px] sm:h-[560px] xl:h-[680px] relative">
          <MapContainer center={BANDUNG_CENTER} zoom={11} scrollWheelZoom className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredStations.map((s) => (
              <Marker
                key={s.id}
                position={[s.lat, s.lng]}
                icon={createStationIcon(s.status, s.id === selectedId)}
                eventHandlers={{ click: () => setSelectedId(s.id) }}
              >
                <Popup>
                  <div className="p-4">
                    <p className="font-display font-bold text-abyss-950 text-sm leading-tight">{s.name}</p>
                    <p className="text-xs text-slate-ink/50 mt-0.5">Lokasi: {s.river}</p>

                    <span
                      className={`inline-flex mt-2 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusBadgeClass[s.status]}`}
                    >
                      {statusLabel[s.status]}
                    </span>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 pt-3 border-t border-mist-200">
                      {popupParams(s).map(({ label, value, unit, icon: Icon }) => (
                        <div key={label} className="flex items-center gap-1.5">
                          <Icon size={12} className="text-current-600 shrink-0" />
                          <span className="text-[11px] text-slate-ink/55">{label}</span>
                          <span className="ml-auto text-[11px] font-mono-data font-semibold text-abyss-950">
                            {value}
                            {unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {selectedStation && <FlyToStation station={selectedStation} />}
          </MapContainer>

          <div className="absolute left-3 bottom-3 z-[400] rounded-xl bg-white/95 backdrop-blur border border-mist-200 px-3 py-2 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-ink/40 mb-1.5">
              Status Risiko
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-ink/65">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-current-500" />
                Aman
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-caution" />
                Waspada
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-critical" />
                Bahaya
              </span>
            </div>
          </div>
        </div>

        <MapInfoPanel station={selectedStation} onClear={() => setSelectedId(null)} />
      </div>
    </div>
  )
}
