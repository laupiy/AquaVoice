import { useMemo, useState } from 'react'
import { Activity, Droplet, Thermometer, Waves, Wind, CloudFog } from 'lucide-react'
import StatCard from '../components/StatCard'
import WaterChart from '../components/WaterChart'
import SearchBar from '../components/SearchBar'
import MonitoringFilterBar from '../components/MonitoringFilterBar'
import WaterQualityTable from '../components/WaterQualityTable'
import waterQuality from '../data/waterQuality.json'

const ALL_STATUSES = ['safe', 'warning', 'critical']

const chartParams = [
  { key: 'ph', label: 'pH', unit: '', icon: Droplet },
  { key: 'temperature', label: 'Suhu', unit: '\u00b0C', icon: Thermometer },
  { key: 'salinity', label: 'Salinitas', unit: 'ppt', icon: Waves },
  { key: 'do', label: 'Oksigen Terlarut', unit: 'mg/L', icon: Wind },
  { key: 'turbidity', label: 'Kekeruhan', unit: 'NTU', icon: CloudFog },
]

function shortLabel(name) {
  const parts = name.split('-')
  return parts.length > 1 ? parts[parts.length - 1].trim() : name
}

function getSnapshotValues(station, time) {
  if (time === 'current') {
    return {
      ph: station.current.ph,
      temperature: station.current.temperature,
      salinity: station.current.salinity,
      dissolvedOxygen: station.current.dissolvedOxygen,
      turbidity: station.current.turbidity,
    }
  }
  const point = station.trend.find((t) => t.time === time)
  if (!point) return getSnapshotValues(station, 'current')
  return {
    ph: point.ph,
    temperature: point.temperature,
    salinity: point.salinity,
    dissolvedOxygen: point.do,
    turbidity: point.turbidity,
  }
}

function average(rows, key) {
  if (!rows.length) return '\u2014'
  const sum = rows.reduce((acc, r) => acc + (r[key] ?? 0), 0)
  return (sum / rows.length).toFixed(2)
}

function buildTrendSeries(stations, paramKey) {
  const times = stations[0]?.trend.map((t) => t.time) || []
  return times.map((time, i) => {
    const row = { time }
    stations.forEach((s) => {
      row[shortLabel(s.name)] = s.trend[i]?.[paramKey]
    })
    return row
  })
}

export default function Monitoring() {
  const { stations } = waterQuality

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('all')
  const [time, setTime] = useState('current')
  const [statusFilter, setStatusFilter] = useState(new Set(ALL_STATUSES))
  const [activeParam, setActiveParam] = useState(chartParams[0].key)

  const locations = useMemo(() => stations.map((s) => s.name), [stations])

  const timeOptions = useMemo(() => {
    const times = new Set()
    stations.forEach((s) => s.trend.forEach((t) => times.add(t.time)))
    return [{ value: 'current', label: 'Terkini' }, ...Array.from(times).sort().map((t) => ({ value: t, label: t }))]
  }, [stations])

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
    setLocation('all')
    setTime('current')
    setStatusFilter(new Set(ALL_STATUSES))
  }

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      if (!statusFilter.has(s.status)) return false
      if (location !== 'all' && s.name !== location) return false
      if (search && !`${s.name} ${s.river}`.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [stations, statusFilter, location, search])

  const rows = useMemo(
    () =>
      filteredStations.map((s) => ({
        id: s.id,
        name: s.name,
        river: s.river,
        status: s.status,
        lastUpdated: s.lastUpdated,
        ...getSnapshotValues(s, time),
      })),
    [filteredStations, time]
  )

  const summaryStats = [
    { icon: Droplet, label: 'Rata-rata pH', value: average(rows, 'ph'), unit: '', variant: 'current' },
    { icon: Thermometer, label: 'Rata-rata Suhu', value: average(rows, 'temperature'), unit: '\u00b0C', variant: 'flow' },
    { icon: Waves, label: 'Rata-rata Salinitas', value: average(rows, 'salinity'), unit: 'ppt', variant: 'current' },
    { icon: Wind, label: 'Rata-rata DO', value: average(rows, 'dissolvedOxygen'), unit: 'mg/L', variant: 'flow' },
    { icon: CloudFog, label: 'Rata-rata Kekeruhan', value: average(rows, 'turbidity'), unit: 'NTU', variant: 'caution' },
  ]

  const activeParamMeta = chartParams.find((p) => p.key === activeParam)
  const chartData = buildTrendSeries(filteredStations, activeParam)
  const chartLines = filteredStations.map((s) => ({ key: shortLabel(s.name), name: shortLabel(s.name) }))

  return (
    <div className="space-y-6">
      {/* 1. Page header */}
      <div>
        <h2 className="font-display font-bold text-abyss-950 text-xl flex items-center gap-2">
          <Activity size={20} className="text-current-600" />
          Monitoring Kualitas Air
        </h2>
        <p className="text-sm text-slate-ink/50 mt-1">
          Pantau parameter kualitas air seluruh stasiun secara real-time dan historis
        </p>
      </div>

      {/* 2. Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {summaryStats.map(({ icon, label, value, unit, variant }) => (
          <StatCard key={label} icon={icon} label={label} value={value} unit={unit} variant={variant} />
        ))}
      </div>

      {/* 3 & 4. Search bar + filters */}
      <div className="rounded-2xl bg-white border border-mist-200 p-4 sm:p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Cari nama stasiun atau sungai..." className="max-w-md" />
        <MonitoringFilterBar
          locations={locations}
          location={location}
          onLocationChange={setLocation}
          timeOptions={timeOptions}
          time={time}
          onTimeChange={setTime}
          statusFilter={statusFilter}
          onToggleStatus={toggleStatus}
          onReset={resetFilters}
        />
      </div>

      {/* 5. Historical charts */}
      <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6 hover:shadow-[0_8px_28px_-14px_rgba(11,42,66,0.18)] transition-shadow duration-200">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div>
            <h3 className="font-display font-bold text-abyss-950">Tren Historis</h3>
            <p className="text-sm text-slate-ink/50">
              {filteredStations.length} stasiun &middot; 6 titik waktu terakhir
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {chartParams.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveParam(key)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 hover:-translate-y-0.5
                ${
                  activeParam === key
                    ? 'bg-current-500 border-current-500 text-white shadow-sm shadow-current-500/30'
                    : 'bg-white border-mist-200 text-slate-ink/55 hover:border-current-300 hover:text-current-600'
                }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {chartLines.length > 0 ? (
          <>
            <WaterChart data={chartData} lines={chartLines} height={280} />
            <p className="mt-1 text-xs text-slate-ink/40 text-right">Satuan: {activeParamMeta.unit || '\u2014'}</p>
          </>
        ) : (
          <div className="h-[280px] grid place-items-center text-sm text-slate-ink/45">
            Tidak ada data untuk ditampilkan pada filter ini.
          </div>
        )}
      </div>

      {/* 6 & 7. Data table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-abyss-950">Data Stasiun</h3>
          <p className="text-xs text-slate-ink/45">{rows.length} dari {stations.length} stasiun ditampilkan</p>
        </div>
        <WaterQualityTable rows={rows} />
      </div>
    </div>
  )
}
