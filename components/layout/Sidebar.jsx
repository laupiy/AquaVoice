'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { USER_NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/lib/constants';

export default function Sidebar({ role = 'USER' }) {
  const pathname = usePathname();
  const navItems = role === 'ADMIN' ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-md border-r border-slate-200/80 min-h-[calc(100vh-4rem)] p-4 hidden md:flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header Indicator Role */}
        <div className="px-3 py-2 rounded-xl bg-slate-100/80 border border-slate-200/60">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Akses Navigasi
          </p>
          <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
            <span className={`w-2 h-2 rounded-full ${role === 'ADMIN' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
            {role === 'ADMIN' ? 'Administrator System' : 'Warga / Nelayan Pesisir'}
          </p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Card */}
      <div className="card-base p-3 bg-gradient-to-br from-cyan-50 to-blue-50/50 border-cyan-100">
        <div className="flex items-center gap-2">
          <span className="text-base">🌊</span>
          <div>
            <p className="text-xs font-bold text-slate-800">AquaVoice v1.0</p>
            <p className="text-[10px] text-slate-500">Smart Water Mitigation System</p>
          </div>
        </div>
      </div>
    </aside>
  );
}