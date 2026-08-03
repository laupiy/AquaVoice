'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MapPinned,
  ClipboardList,
  BellRing,
  FileText,
  User,
  Waves,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/water-map', label: 'Water Map', icon: MapPinned },
  { href: '/report', label: 'AquaVoice Report', icon: ClipboardList },
  { href: '/alerts', label: 'Alerts', icon: BellRing },
  { href: '/my-reports', label: 'My Reports', icon: FileText },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-abyss-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 shrink-0 bg-abyss-950 text-mist-100 flex flex-col
          transform transition-transform duration-300 lg:static lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-abyss-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="relative grid place-items-center w-10 h-10 rounded-2xl bg-current-500/15 text-current-300">
              <span className="ripple absolute text-current-400/60" />
              <Waves size={20} strokeWidth={2.2} />
            </span>
            <div className="leading-tight">
              <p className="font-display font-extrabold text-lg tracking-tight text-white">
                Aqua<span className="text-current-400">Voice</span>
              </p>
              <p className="text-[11px] text-mist-100/50">User Portal</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-mist-100/60 hover:text-white"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-mist-100/35">
            Menu Utama
          </p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-current-500/15 text-current-300'
                      : 'text-mist-100/65 hover:bg-abyss-900 hover:text-mist-100'
                  }`}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mx-4 mb-5 rounded-2xl bg-abyss-900 border border-abyss-800">
          <p className="text-xs font-semibold text-current-300">Quick Voice Report</p>
          <p className="mt-1 text-[13px] text-mist-100/60">
            Laporkan pencemaran air dengan suara langsung dari dashboard.
          </p>
        </div>
      </aside>
    </>
  );
}
