import StatusBadge from './StatusBadge'

function formatTime(iso) {
  return new Date(iso).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function WaterQualityTable({ rows }) {
  return (
    <div className="rounded-2xl bg-white border border-mist-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[860px]">
          <thead>
            <tr className="border-b border-mist-200 bg-mist-50/60">
              <th className="text-left font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-5 py-3">
                Lokasi
              </th>
              <th className="text-right font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-4 py-3">
                pH
              </th>
              <th className="text-right font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-4 py-3">
                Suhu
              </th>
              <th className="text-right font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-4 py-3">
                Salinitas
              </th>
              <th className="text-right font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-4 py-3">
                DO
              </th>
              <th className="text-right font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-4 py-3">
                Kekeruhan
              </th>
              <th className="text-center font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-4 py-3">
                Status
              </th>
              <th className="text-right font-semibold text-slate-ink/55 text-xs uppercase tracking-wider px-5 py-3">
                Update Terakhir
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist-200">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-mist-50 transition-colors duration-200">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-abyss-950 truncate max-w-[220px]">{r.name}</p>
                  <p className="text-xs text-slate-ink/45">{r.river}</p>
                </td>
                <td className="px-4 py-3.5 text-right font-mono-data text-abyss-950">{r.ph}</td>
                <td className="px-4 py-3.5 text-right font-mono-data text-abyss-950">{r.temperature}&deg;C</td>
                <td className="px-4 py-3.5 text-right font-mono-data text-abyss-950">{r.salinity} ppt</td>
                <td className="px-4 py-3.5 text-right font-mono-data text-abyss-950">{r.dissolvedOxygen} mg/L</td>
                <td className="px-4 py-3.5 text-right font-mono-data text-abyss-950">{r.turbidity} NTU</td>
                <td className="px-4 py-3.5 text-center">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-5 py-3.5 text-right text-xs text-slate-ink/45 font-mono-data">
                  {formatTime(r.lastUpdated)}
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-ink/45">
                  Tidak ada data yang cocok dengan filter saat ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
