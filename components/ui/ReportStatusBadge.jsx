import { reportStatusStyles } from '@/utils/helpers';
import { REPORT_STATUS } from '@/lib/validations';

export default function ReportStatusBadge({ status }) {
  const key = status || 'menunggu_verifikasi';
  return (
    <span
      className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${reportStatusStyles[key] || reportStatusStyles.menunggu_verifikasi}`}
    >
      {REPORT_STATUS[key] || key}
    </span>
  );
}
