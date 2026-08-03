import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDashboardData } from '@/services/dataService';
import DashboardView from '@/components/dashboard/DashboardView';
import { getOverallStatus } from '@/utils/helpers';

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  const data = await getDashboardData(user.id);
  const overallStatus = getOverallStatus(data.stations);

  const statusText = {
    safe: 'Baik — kondisi air di sekitar Anda umumnya aman.',
    warning: 'Waspada — beberapa stasiun menunjukkan penurunan kualitas air.',
    critical: 'Siaga — terdapat stasiun dengan kondisi air berbahaya.',
  };

  return (
    <DashboardView
      user={user}
      data={data}
      overallStatus={overallStatus}
      statusSummary={statusText[overallStatus]}
    />
  );
}
