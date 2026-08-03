const styles = {
  safe: 'bg-current-500/10 text-current-600 border-current-300/40',
  warning: 'bg-caution/10 text-caution border-caution/30',
  critical: 'bg-critical/10 text-critical border-critical/30',
}

const dotStyles = {
  safe: 'bg-current-500',
  warning: 'bg-caution',
  critical: 'bg-critical',
}

const labels = {
  safe: 'Aman',
  warning: 'Waspada',
  critical: 'Bahaya',
}

export default function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${
        styles[status] || styles.safe
      } ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status] || dotStyles.safe}`} />
      {labels[status] || status}
    </span>
  )
}
