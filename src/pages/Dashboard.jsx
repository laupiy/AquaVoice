import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Droplets,
  Activity,
  AlertOctagon,
  ClipboardList,
  ArrowRight,
  Droplet,
  Thermometer,
  Waves,
  Wind,
  CloudFog,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import WaterChart from '../components/WaterChart'
import AlertCard from '../components/AlertCard'
import ReportCard from '../components/ReportCard'
import RiskMatrix from '../components/RiskMatrix'
import waterQuality from '../data/waterQuality.json'
import alertsData from '../data/alerts.json'
import reportsData from '../data/reports.json'

const statusStyles = {
  safe: 'bg-current-500/10 text-current-600 border-current-300/40',
  warning: 'bg-caution/10 text-caution border-caution/30',
  critical: 'bg-critical/10 text-critical border-critical/30',
}
const statusLabel = { safe: 'Aman', warning: 'Waspada', critical: 'Bahaya' }

const stationShortNames = {
  'STN-01': 'Dago',
  'STN-02': 'Batujajar',
  'STN-03': 'Saguling',
  'STN-04': 'Bojongsoang',
  'STN-05': 'Cileunca',
}
const stationColors = {
  'STN-01': '#0D9488',
  'STN-02': '#E11D48',
  'STN-03': '#F59E0B',
  'STN-04': '#0EA5E9',
  'STN-05': '#184C75',
}

const chartParams = [
  { key: 'ph', label: 'pH', unit: '', icon: Droplet },
  { key: 'temperature', label: 'Suhu', unit: '\u00b0C', icon: Thermometer },
  { key: 'salinity', label: 'Salinitas', unit: 'ppt', icon: Waves },
  { key: 'do', label: 'Oksigen Terlarut', unit: 'mg/L', icon: Wind, valueKey: 'dissolvedOxygen' },
  { key: 'turbidity', label: 'Kekeruhan', unit: 'NTU', icon: CloudFog },
]

function buildSeries(stations, paramKey) {
  const times = stations[0]?.trend.map((t) => t.time) || []
  return times.map((time, i) => {
    const row = { time }
    stations.forEach((s) => {
      row[stationShortNames[s.id] || s.name] = s.trend[i]?.[paramKey]
    })
    return row
  })
}

function average(stations, key) {
  const sum = stations.reduce((acc, s) => acc + (s.current[key] ?? 0), 0)
  return (sum / stations.length).toFixed(2)
}

export default function Dashboard() {
  const { stations } = waterQuality
  const [activeParam, setActiveParam] = useState(chartParams[0].key)

  const safeCount = stations.filter((s) => s.status === 'safe').length
  const warningCount = stations.filter((s) => s.status === 'warning').length
  const dangerCount = stations.filter((s) => s.status === 'critical').length
  const total = stations.length

  const riskItems = [
    { key: 'safe', label: 'Aman', count: safeCount, percentage: Math.round((safeCount / total) * 100) },
    { key: 'warning', label: 'Waspada', count: warningCount, percentage: Math.round((warningCount / total) * 100) },
    { key: 'danger', label: 'Bahaya', count: dangerCount, percentage: Math.round((dangerCount / total) * 100) },
  ]

  const overallStatus = dangerCount > 0 ? 'critical' : warningCount > 0 ? 'warning' : 'safe'
  const overallStatusText = { safe: 'Baik', warning: 'Waspada', critical: 'Siaga' }[overallStatus]

  const activeAlertsCount = alertsData.filter((a) => a.status !== 'selesai').length
  const reportsToday = reportsData.filter((r) => r.timestamp.startsWith('2026-08-03')).length

  const recentAlerts = [...alertsData]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 4)
  const recentReports = [...reportsData]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 4)

  const activeParamMeta = chartParams.find((p) => p.key === activeParam)
  const chartData = buildSeries(stations, activeParam)
  const chartLines = stations.map((s) => ({
    key: stationShortNames[s.id] || s.name,
    name: stationShortNames[s.id] || s.name,
    color: stationColors[s.id],
  }))

  const quickStats = [
    { icon: Droplet, label: 'Rata-rata pH', value: average(stations, 'ph'), unit: '' },
    { icon: Thermometer, label: 'Rata-rata Suhu', value: average(stations, 'temperature'), unit: '\u00b0C' },
    { icon: Waves, label: 'Rata-rata Salinitas', value: average(stations, 'salinity'), unit: 'ppt' },
    { icon: Wind, label: 'Rata-rata Oksigen Terlarut', value: average(stations, 'dissolvedOxygen'), unit: 'mg/L' },
    { icon: CloudFog, label: 'Rata-rata Kekeruhan', value: average(stations, 'turbidity'), unit: 'NTU' },
  ]

  return (
    <div className="space-y-6">
      {/* 1. Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Droplets}
          label="Status Kualitas Air"
          value={overallStatusText}
          delta={`${safeCount}/${total} stasiun aman`}
          deltaLabel=""
          variant={overallStatus === 'critical' ? 'critical' : overallStatus === 'warning' ? 'caution' : 'current'}
          showRipple={overallStatus === 'critical'}
        />
        <StatCard
          icon={Activity}
          label="Sensor Aktif"
          value="48"
          unit="/ 52"
          delta="92%"
          deltaLabel="node online"
          variant="flow"
        />
        <StatCard
          icon={AlertOctagon}
          label="Peringatan Aktif"
          value={activeAlertsCount}
          delta={`${alertsData.length} total`}
          deltaLabel="riwayat"
          trendDirection={activeAlertsCount > 0 ? 'down' : 'up'}
          variant="critical"
          showRipple={activeAlertsCount > 0}
        />
        <StatCard
          icon={ClipboardList}
          label="Laporan Warga Hari Ini"
          value={reportsToday}
          delta={`${reportsData.length} total`}
          deltaLabel="minggu ini"
          variant="caution"
        />
      </div>

      {/* 2. Charts + Risk matrix */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl bg-white border border-mist-200 p-5 sm:p-6 hover:shadow-[0_8px_28px_-14px_rgba(11,42,66,0.18)] transition-shadow duration-200">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <h3 className="font-display font-bold text-abyss-950">Tren Kualitas Air</h3>
              <p className="text-sm text-slate-ink/50">Perbandingan antar stasiun, 6 titik waktu terakhir</p>
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

          <WaterChart data={chartData} lines={chartLines} height={280} />
          <p className="mt-1 text-xs text-slate-ink/40 text-right">
            Satuan: {activeParamMeta.unit || '\u2014'}
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6 hover:shadow-[0_8px_28px_-14px_rgba(11,42,66,0.18)] transition-shadow duration-200">
          <h3 className="font-display font-bold text-abyss-950 mb-1">Matriks Risiko</h3>
          <p className="text-sm text-slate-ink/50 mb-4">Distribusi status {total} stasiun pemantauan</p>
          <RiskMatrix items={riskItems} />
        </div>
      </div>

      {/* 3. Station status + quick statistics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl bg-white border border-mist-200 p-5 sm:p-6 hover:shadow-[0_8px_28px_-14px_rgba(11,42,66,0.18)] transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-abyss-950">Status Seluruh Stasiun</h3>
            <Link
              to="/monitoring"
              className="text-sm font-medium text-current-600 hover:text-current-700 flex items-center gap-1"
            >
              Lihat detail <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-mist-200">
            {stations.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0 rounded-lg hover:bg-mist-50 px-2 -mx-2 transition-colors duration-200"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-abyss-950 truncate">{s.name}</p>
                  <p className="text-xs text-slate-ink/45 font-mono-data">
                    pH {s.current.ph} \u00b7 {s.current.turbidity} NTU \u00b7 {s.current.temperature}\u00b0C
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[s.status]}`}
                >
                  {statusLabel[s.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6 hover:shadow-[0_8px_28px_-14px_rgba(11,42,66,0.18)] transition-shadow duration-200">
          <h3 className="font-display font-bold text-abyss-950 mb-1">Statistik Cepat</h3>
          <p className="text-sm text-slate-ink/50 mb-4">Rata-rata seluruh stasiun</p>
          <div className="space-y-1">
            {quickStats.map(({ icon: Icon, label, value, unit }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg px-2 py-2.5 -mx-2 hover:bg-mist-50 hover:scale-[1.01] transition-all duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-current-500/10 text-current-600">
                    <Icon size={15} />
                  </span>
                  <span className="text-sm text-slate-ink/70">{label}</span>
                </div>
                <span className="font-mono-data text-sm font-semibold text-abyss-950">
                  {value} <span className="text-slate-ink/40 font-normal">{unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 & 5. Recent alerts + community reports */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-abyss-950">Peringatan Terbaru</h3>
            <Link
              to="/peringatan"
              className="text-sm font-medium text-current-600 hover:text-current-700 flex items-center gap-1"
            >
              Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-abyss-950">Laporan Warga</h3>
            <Link
              to="/laporan"
              className="text-sm font-medium text-current-600 hover:text-current-700 flex items-center gap-1"
            >
              Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
