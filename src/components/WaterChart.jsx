import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

const palette = ['#0D9488', '#0EA5E9', '#F59E0B', '#E11D48']

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-abyss-950 text-mist-100 px-3.5 py-2.5 shadow-lg text-xs">
      <p className="font-semibold text-mist-100/70 mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center gap-2 font-mono-data">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function WaterChart({ data, lines, xKey = 'time', height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
        <defs>
          {lines.map((line, i) => (
            <linearGradient key={line.key} id={`fill-${line.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={line.color || palette[i % palette.length]} stopOpacity={0.28} />
              <stop offset="95%" stopColor={line.color || palette[i % palette.length]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#DCE8EC" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fill: '#26333D99' }}
          axisLine={{ stroke: '#DCE8EC' }}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 12, fill: '#26333D99' }} axisLine={false} tickLine={false} width={36} />
        <Tooltip content={<CustomTooltip />} />
        {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />}
        {lines.map((line, i) => (
          <Area
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name || line.key}
            stroke={line.color || palette[i % palette.length]}
            strokeWidth={2.5}
            fill={`url(#fill-${line.key})`}
            dot={false}
            activeDot={{ r: 5 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
