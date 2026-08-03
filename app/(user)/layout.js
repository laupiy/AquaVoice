import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { getActiveAlertsCount } from '@/services/dataService';
import UserLayout from '@/components/layout/UserLayout';

export default async function DashboardLayout({ children }) {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const alertCount = await getActiveAlertsCount();

  return (
    <UserLayout user={user} alertCount={alertCount}>
      {children}
    </UserLayout>
  );
}
