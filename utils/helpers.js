export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatDateShort(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function getInitials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function calculateWQI(station) {
  if (station.wqi) return station.wqi;
  let score = 100;
  if (station.ph < 6.5 || station.ph > 8.5) score -= 15;
  if (station.dissolvedOxygen < 5) score -= 25;
  if (station.turbidity > 25) score -= 20;
  if (station.temperature > 30) score -= 10;
  return Math.max(0, Math.min(100, score));
}

export function getOverallStatus(stations) {
  if (stations.some((s) => s.status === 'critical')) return 'critical';
  if (stations.some((s) => s.status === 'warning')) return 'warning';
  return 'safe';
}

export function generateReportNumber(count) {
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(5, '0');
  return `AV-${year}-${num}`;
}

export function parseTrendData(trendData) {
  try {
    return JSON.parse(trendData);
  } catch {
    return [];
  }
}

export const statusStyles = {
  safe: 'bg-current-500/10 text-current-600 border-current-300/40',
  warning: 'bg-caution/10 text-caution border-caution/30',
  critical: 'bg-critical/10 text-critical border-critical/30',
};

export const alertLevelStyles = {
  safe: 'bg-current-500/10 text-current-600 border-l-current-500',
  warning: 'bg-caution/10 text-caution border-l-caution',
  critical: 'bg-critical/10 text-critical border-l-critical',
};

export const ALERT_LEVEL_LABELS = {
  safe: 'Aman',
  warning: 'Waspada',
  critical: 'Bahaya',
};

export const STATUS_LABELS = {
  safe: 'Aman',
  warning: 'Waspada',
  critical: 'Bahaya',
};

export const reportStatusStyles = {
  menunggu_verifikasi: 'bg-slate-ink/10 text-slate-ink/70',
  diverifikasi: 'bg-flow-500/10 text-flow-600',
  sedang_ditangani: 'bg-caution/10 text-caution',
  selesai: 'bg-current-500/10 text-current-600',
};
