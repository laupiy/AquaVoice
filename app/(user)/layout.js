'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';

export default function UserLayout({ children }) {
  const [role, setRole] = useState('USER');
  const router = useRouter();

  const handleToggleRole = () => {
    if (role === 'USER') {
      setRole('ADMIN');
      router.push('/admin/dashboard');
    } else {
      setRole('USER');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar currentRole={role} onToggleRole={handleToggleRole} />
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <Sidebar role={role} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}