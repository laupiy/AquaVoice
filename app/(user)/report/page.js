import ReportForm from '@/components/report/ReportForm';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function ReportPage() {
  const user = getSessionUser();
  if (!user) redirect('/login');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-white border border-mist-200 p-5 sm:p-8">
        <h3 className="font-display font-bold text-xl text-abyss-950">AquaVoice Report</h3>
        <p className="text-sm text-slate-ink/55 mt-1">
          Laporkan kondisi air di sekitar Anda dengan foto, suara, dan lokasi GPS.
        </p>
        <ReportForm />
      </div>
    </div>
  );
}
