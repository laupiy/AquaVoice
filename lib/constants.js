export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const USER_NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Kualitas Air', href: '/water-map', icon: 'Waves' },
  { name: 'Mitigasi Pintar', href: '/mitigation', icon: 'ShieldAlert' },
  { name: 'Lapor AquaVoice', href: '/report', icon: 'Mic' },
  { name: 'Laporan Saya', href: '/my-reports', icon: 'ClipboardList' },
  { name: 'Pusat Darurat', href: '/alerts', icon: 'Bell' },
  { name: 'Profil', href: '/profile', icon: 'User' },
];

export const ADMIN_NAV_ITEMS = [
  { name: 'Overview Admin', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { name: 'Kelola Laporan', href: '/admin/reports', icon: 'FileText' },
  { name: 'Monitor Perairan', href: '/admin/water-quality', icon: 'Activity' },
  { name: 'Broadcast Darurat', href: '/admin/broadcast', icon: 'Radio' },
  { name: 'SOP Mitigasi', href: '/admin/mitigation-sop', icon: 'BookOpen' },
  { name: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
];

export const RISK_LEVELS = {
  SAFE: {
    label: 'AMAN',
    color: 'emerald',
    badgeClass: 'badge-safe',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  WARNING: {
    label: 'WASPADA',
    color: 'amber',
    badgeClass: 'badge-warning',
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  DANGER: {
    label: 'BAHAYA',
    color: 'rose',
    badgeClass: 'badge-danger',
    bgLight: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    dot: 'bg-rose-500',
  },
};