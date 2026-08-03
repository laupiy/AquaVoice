import LandingPage from '@/components/landing/LandingPage';
import { getAppStats } from '@/services/dataService';

export default async function HomePage() {
  const stats = await getAppStats();
  return <LandingPage stats={stats} />;
}
