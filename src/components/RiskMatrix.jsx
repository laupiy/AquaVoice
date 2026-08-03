const colorMap = {
  safe: { dot: 'bg-current-500', text: 'text-current-600', bar: 'bg-current-500' },
  warning: { dot: 'bg-caution', text: 'text-caution', bar: 'bg-caution' },
  danger: { dot: 'bg-critical', text: 'text-critical', bar: 'bg-critical' },
}

export default function RiskMatrix({ items }) {
  return (
    <div className="space-y-4">
      <div className="flex w-full h-2.5 rounded-full overflow-hidden bg-mist-100">
        {items.map(
          (item) =>
            item.percentage > 0 && (
              <div
                key={item.key}
                className={`${colorMap[item.key].bar} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            )
        )}
      </div>

      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-lg px-2 py-2 -mx-2 hover:bg-mist-50 hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${colorMap[item.key].dot}`} />
              <span className="text-sm font-medium text-abyss-950">{item.label}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-ink/45">{item.count} stasiun</span>
              <span className={`font-mono-data text-sm font-semibold ${colorMap[item.key].text}`}>
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
