'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [role, setRole] = useState('ADMIN');
  const router = useRouter();

  const handleToggleRole = () => {
    if (role === 'ADMIN') {
      setRole('USER');
      router.push('/dashboard');
    } else {
      setRole('ADMIN');
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/5 bg-slate-50 flex flex-col">
      <Navbar currentRole={role} onToggleRole={handleToggleRole} />
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <Sidebar role={role} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Admin Header Banner Notice */}
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-amber-500 text-white font-bold text-xs">
                ADMIN
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Panel Kontrol Terpusat</h4>
                <p className="text-xs text-slate-500">Anda memiliki hak akses penuh untuk verifikasi laporan dan publikasi darurat.</p>
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}