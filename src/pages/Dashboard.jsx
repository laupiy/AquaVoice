import { Droplets, Gauge, AlertOctagon, ClipboardList, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import WaterChart from '../components/WaterChart'
import AlertCard from '../components/AlertCard'
import waterQuality from '../data/waterQuality.json'
import alertsData from '../data/alerts.json'
import reportsData from '../data/reports.json'

const statusStyles = {
  safe: 'bg-current-500/10 text-current-600 border-current-300/40',
  warning: 'bg-caution/10 text-caution border-caution/30',
  critical: 'bg-critical/10 text-critical border-critical/30',
}

const statusLabel = { safe: 'Aman', warning: 'Perhatian', critical: 'Kritis' }

export default function Dashboard() {
  const { stations } = waterQuality
  const avgPh = (stations.reduce((sum, s) => sum + s.current.ph, 0) / stations.length).toFixed(1)
  const criticalCount = stations.filter((s) => s.status === 'critical').length
  const activeReports = reportsData.filter((r) => r.status !== 'selesai').length
  const focusStation = stations.find((s) => s.status === 'critical') || stations[0]
  const recentAlerts = [...alertsData]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Stat row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Droplets}
          label="Stasiun Termonitor"
          value={stations.length}
          unit="titik"
          delta="48/52 node"
          deltaLabel="sensor aktif"
          variant="current"
        />
        <StatCard
          icon={Gauge}
          label="Rata-rata pH DAS"
          value={avgPh}
          delta="Normal 6.5–8.5"
          deltaLabel="rentang aman"
          variant="flow"
        />
        <StatCard
          icon={AlertOctagon}
          label="Stasiun Berstatus Kritis"
          value={criticalCount}
          delta={criticalCount > 0 ? 'Perlu tindakan' : 'Terkendali'}
          deltaLabel="saat ini"
          trendDirection={criticalCount > 0 ? 'down' : 'up'}
          variant="critical"
          showRipple={criticalCount > 0}
        />
        <StatCard
          icon={ClipboardList}
          label="Laporan Warga Aktif"
          value={activeReports}
          delta={`${reportsData.length} total`}
          deltaLabel="masuk minggu ini"
          variant="caution"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Trend chart + station status */}
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-display font-bold text-abyss-950">Tren Parameter Terkini</h3>
                <p className="text-sm text-slate-ink/50">
                  {focusStation.name} &middot; kekeruhan &amp; oksigen terlarut, 6 titik waktu terakhir
                </p>
              </div>
              <span
                className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[focusStation.status]}`}
              >
                {statusLabel[focusStation.status]}
              </span>
            </div>
            <WaterChart
              data={focusStation.trend}
              lines={[
                { key: 'turbidity', name: 'Kekeruhan (NTU)', color: '#0EA5E9' },
                { key: 'do', name: 'Oksigen Terlarut (mg/L)', color: '#0D9488' },
              ]}
            />
          </div>

          <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
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
                <div key={s.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-abyss-950 truncate">{s.name}</p>
                    <p className="text-xs text-slate-ink/45 font-mono-data">
                      pH {s.current.ph} &middot; {s.current.turbidity} NTU &middot; {s.current.temperature}°C
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
        </div>

        {/* Alerts panel */}
        <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6 h-fit">
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
      </div>
    </div>
  )
}
