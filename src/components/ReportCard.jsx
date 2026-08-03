import { Factory, Trash2, Droplet, Wind, Fish, ThumbsUp } from 'lucide-react'

const categoryIcons = {
  'Limbah Industri': Factory,
  Sampah: Trash2,
  'Perubahan Warna Air': Droplet,
  'Bau Tidak Sedap': Wind,
  'Ikan Mati': Fish,
}

const statusStyles = {
  diverifikasi: 'bg-flow-500/10 text-flow-600',
  diproses: 'bg-caution/10 text-caution',
  selesai: 'bg-current-500/10 text-current-600',
}

function timeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime()
  const hours = Math.round(diffMs / 3600000)
  if (hours < 24) return `${hours} jam lalu`
  return `${Math.round(hours / 24)} hari lalu`
}

export default function ReportCard({ report }) {
  const Icon = categoryIcons[report.category] || Droplet

  return (
    <div className="flex gap-3.5 p-4 rounded-xl border border-mist-200 bg-white hover:border-flow-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <div className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-flow-500/10 text-flow-600">
        <Icon size={17} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-abyss-950 truncate">{report.location}</p>
          <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[report.status]}`}>
            {report.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-ink/65 leading-snug line-clamp-2">{report.description}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-ink/40">
          <span className="font-medium text-slate-ink/50">{report.category}</span>
          <span>&middot;</span>
          <span>{timeAgo(report.timestamp)}</span>
          <span className="ml-auto flex items-center gap-1 text-slate-ink/45">
            <ThumbsUp size={12} /> {report.upvotes}
          </span>
        </div>
      </div>
    </div>
  )
}
