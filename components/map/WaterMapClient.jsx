'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const WaterMapView = dynamic(() => import('@/components/map/WaterMapView'), {
  ssr: false,
  loading: () => <div className="h-[500px] rounded-2xl bg-mist-100 animate-pulse" />,
});

export default function WaterMapClient({ stations }) {
  const [filter, setFilter] = useState('all');

  return (
    <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="font-display font-bold text-abyss-950">Peta Kualitas Air</h3>
        <p className="text-sm text-slate-ink/50">
          Klik marker untuk melihat detail kualitas air di setiap stasiun
        </p>
      </div>
      <WaterMapView stations={stations} filter={filter} onFilterChange={setFilter} />
    </div>
  );
}
