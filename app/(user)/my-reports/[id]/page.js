import { notFound } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { getReportById } from '@/services/dataService';
import ReportDetailView from '@/components/reports/ReportDetailView';

export default async function ReportDetailPage({ params }) {
  const user = await getSessionUser();
  const { id } = await params;
  const report = await getReportById(id, user.id);

  if (!report) notFound();

  return <ReportDetailView report={report} />;
}
