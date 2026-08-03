import { getAlerts } from '@/services/dataService';
import AlertsView from '@/components/alerts/AlertsView';

export default async function AlertsPage() {
  const alerts = await getAlerts();
  return <AlertsView alerts={alerts} />;
}
