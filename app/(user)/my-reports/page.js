import { getSessionUser } from '@/lib/auth';
import { getUserReports } from '@/services/dataService';
import MyReportsView from '@/components/reports/MyReportsView';
import { redirect } from 'next/navigation';

export default async function MyReportsPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  const reports = await getUserReports(user.id);
  return <MyReportsView reports={reports} />;
}
