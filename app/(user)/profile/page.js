import { getSessionUser } from '@/lib/auth';
import { getUserReportStats } from '@/services/dataService';
import ProfileView from '@/components/profile/ProfileView';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  const stats = await getUserReportStats(user.id);
  return <ProfileView user={user} stats={stats} />;
}
