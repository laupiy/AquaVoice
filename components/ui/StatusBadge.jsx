import { STATUS_LABELS, statusStyles } from '@/utils/helpers';

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[status] || statusStyles.safe}`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}
