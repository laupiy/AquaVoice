'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Droplets,
  Activity,
  AlertOctagon,
  MapPinned,
  ArrowRight,
  Droplet,
  Thermometer,
  Wind,
  CloudFog,
  ClipboardList,
} from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import WaterChart from '@/components/dashboard/WaterChart';
import AlertCard from '@/components/dashboard/AlertCard';
import ReportCard from '@/components/dashboard/ReportCard';
import QuickVoiceReport from '@/components/dashboard/QuickVoiceReport';
import StatusBadge from '@/components/ui/StatusBadge';

const chartParams = [
  { key: 'ph', label: 'pH', unit: '', icon: Droplet },
  { key: 'temperature', label: 'Temperature', unit: '°C', icon: Thermometer },
  { key: 'dissolvedOxygen', label: 'Dissolved Oxygen', unit: 'mg/L', icon: Wind },
  { key: 'turbidity', label: 'Turbidity', unit: 'NTU', icon: CloudFog },
];

const stationColors = {
  'STN-01': '#0D9488',
  'STN-02': '#E11D48',
  'STN-03': '#F59E0B',
  'STN-04': '#0EA5E9',
  'STN-05': '#184C75',
};

const shortNames = {
  'STN-01': 'Dago',
  'STN-02': 'Batujajar',
  'STN-03': 'Saguling',
  'STN-04': 'Bojongsoang',
  'STN-05': 'Cileunca',
};

function buildChartData(stations, paramKey) {
  const trend = stations[0]?.trend || [];
  return trend.map((point, i) => {
    const row = { time: point.time };
    stations.forEach((s) => {
      const name = shortNames[s.id] || s.name;
      row[name] = s.trend[i]?.[paramKey];
    });
    return row;
  });
}

export default function DashboardView({ user, data, overallStatus, statusSummary }) {
  const { stations, activeAlerts, recentReports, stats } = data;
  const [activeParam, setActiveParam] = useState('ph');

  const avgWqi = Math.round(stations.reduce((a, s) => a + s.wqi, 0) / stations.length);
  const nearest = stations[0];
  const activeAlertCount = activeAlerts.length;

  const chartData = buildChartData(stations, activeParam);
  const chartLines = stations.map((s) => ({
    key: shortNames[s.id] || s.name,
    name: shortNames[s.id] || s.name,
    color: stationColors[s.id] || '#14B8A6',
  }));

  const activeParamMeta = chartParams.find((p) => p.key === activeParam);

  const statusVariant = overallStatus === 'critical' ? 'critical' : overallStatus === 'warning' ? 'caution' : 'current';

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="rounded-2xl bg-gradient-to-r from-abyss-950 via-abyss-900 to-current-600/40 border border-abyss-800 p-6 sm:p-8 text-white">
        <h2 className="font-display font-extrabold text-2xl">
          Selamat Datang, {user.name}
        </h2>
        <p className="mt-2 text-mist-100/65 max-w-2xl">{statusSummary}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Droplets}
          label="Water Quality Index (WQI)"
          value={avgWqi}
          unit="/ 100"
          delta={`${stations.filter((s) => s.status === 'safe').length}/${stations.length} stasiun aman`}
          variant={statusVariant}
          showRipple={overallStatus === 'critical'}
        />
        <StatCard
          icon={Activity}
          label="Status Air"
          value={overallStatus === 'safe' ? 'Baik' : overallStatus === 'warning' ? 'Waspada' : 'Bahaya'}
          delta="Berdasarkan seluruh stasiun"
          variant={statusVariant}
        />
        <StatCard
          icon={MapPinned}
          label="Monitoring Terdekat"
          value={shortNames[nearest?.id] || '—'}
          delta={nearest?.name}
          deltaLabel=""
          variant="flow"
        />
        <StatCard
          icon={AlertOctagon}
          label="Alert Aktif"
          value={activeAlertCount}
          delta={`${stats?.communityReports || 0} laporan komunitas`}
          deltaLabel=""
          trendDirection={activeAlertCount > 0 ? 'down' : 'up'}
          variant="critical"
          showRipple={activeAlertCount > 0}
        />
      </div>

      {/* Quick Voice Report */}
      <QuickVoiceReport />

      {/* Charts */}
      <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6 hover:shadow-[0_8px_28px_-14px_rgba(11,42,66,0.18)] transition-shadow">
        <div className="mb-4">
          <h3 className="font-display font-bold text-abyss-950">Grafik Monitoring</h3>
          <p className="text-sm text-slate-ink/50">Perbandingan parameter antar stasiun</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {chartParams.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveParam(key)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                activeParam === key
                  ? 'bg-current-500 border-current-500 text-white shadow-sm'
                  : 'bg-white border-mist-200 text-slate-ink/55 hover:border-current-300'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        <WaterChart data={chartData} lines={chartLines} height={280} />
        <p className="mt-1 text-xs text-slate-ink/40 text-right">
          Satuan: {activeParamMeta?.unit || '—'}
        </p>
      </div>

      {/* Recent Reports + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-abyss-950">Laporan Terbaru</h3>
            <Link href="/my-reports" className="text-sm font-medium text-current-600 flex items-center gap-1">
              Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-abyss-950">Alert Terbaru</h3>
            <Link href="/alerts" className="text-sm font-medium text-current-600 flex items-center gap-1">
              Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {activeAlerts.slice(0, 4).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
        <h3 className="font-display font-bold text-abyss-950 mb-4">Quick Action</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/report"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-current-500 to-flow-500 text-white font-semibold text-sm hover:shadow-lg transition-all"
          >
            <ClipboardList size={16} />
            Buat Laporan
          </Link>
          <Link
            href="/water-map"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-mist-200 text-abyss-950 font-semibold text-sm hover:border-current-400 transition-colors"
          >
            <MapPinned size={16} />
            Lihat Water Map
          </Link>
          <Link
            href="/alerts"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-mist-200 text-abyss-950 font-semibold text-sm hover:border-current-400 transition-colors"
          >
            <AlertOctagon size={16} />
            Lihat Alerts
          </Link>
        </div>
      </div>

      {/* Station list */}
      <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
        <h3 className="font-display font-bold text-abyss-950 mb-4">Status Stasiun</h3>
        <div className="divide-y divide-mist-200">
          {stations.map((s) => (
            <div key={s.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-abyss-950">{s.name}</p>
                <p className="text-xs text-slate-ink/45 font-mono-data">
                  WQI {s.wqi} · pH {s.ph} · {s.turbidity} NTU
                </p>
              </div>
              <StatusBadge status={s.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
