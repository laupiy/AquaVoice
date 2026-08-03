'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ currentRole = 'USER', onToggleRole }) {
  const pathname = usePathname();
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 20.3c-.2.39-.08.86.29 1.11.18.12.39.18.6.18.23 0 .46-.07.65-.21l2.58-1.92C9.8 20.3 10.88 20.5 12 20.5c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15.5c-1.02 0-2.01-.22-2.92-.63l-.38-.17-1.87 1.39.46-1.78.18-.71-.52-.51C5.87 14.88 5.3 13.5 5.3 12c0-3.7 3.01-6.7 6.7-6.7s6.7 3.01 6.7 6.7-3.01 6.7-6.7 6.7z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                  AquaVoice
                </span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 rounded-md">
                  Smart Mitigation
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Demo Role Switcher Toggle */}
            <button
              onClick={onToggleRole}
              title="Klik untuk beralih mode tampilan demo"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
            >
              <span className="text-slate-400">Mode:</span>
              <span className={currentRole === 'ADMIN' ? 'text-amber-600 font-bold' : 'text-cyan-600 font-bold'}>
                {currentRole === 'ADMIN' ? '⚡ Panel Admin' : '👤 User / Nelayan'}
              </span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="p-2 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-slate-100 transition-colors relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </button>

              {/* Popover Preview Notification */}
              {showNotificationMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Notifikasi Terkini</span>
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                      1 Darurat
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                    <div className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-2">
                        <span className="p-1 rounded-md bg-rose-100 text-rose-600 mt-0.5">⚠️</span>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">Peringatan Blooming Algae</p>
                          <p className="text-[11px] text-slate-500 line-clamp-2">Terdeteksi lonjakan Anoksia di Sektor Pesisir Utara.</p>
                          <span className="text-[9px] text-slate-400 mt-1 block">10 menit yang lalu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/alerts"
                    onClick={() => setShowNotificationMenu(false)}
                    className="block text-center py-2 text-xs font-semibold text-cyan-600 hover:bg-cyan-50/50 border-t border-slate-100 transition-colors"
                  >
                    Lihat Semua Notifikasi &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Avatar Quick-link */}
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                AV
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}