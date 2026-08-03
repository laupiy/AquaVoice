import { getStations } from '@/services/dataService';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import WaterMapClient from '@/components/map/WaterMapClient';

export default async function WaterMapPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  const stations = await getStations();
  return <WaterMapClient stations={stations} />;
}
