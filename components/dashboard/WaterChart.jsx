'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function WaterChart({ data, lines, height = 280 }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[280px] text-sm text-slate-ink/45">
        Tidak ada data grafik
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DCE8EC" />
        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#26333D88' }} />
        <YAxis tick={{ fontSize: 12, fill: '#26333D88' }} />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #DCE8EC',
            fontSize: '13px',
          }}
        />
        {lines.length > 1 && <Legend wrapperStyle={{ fontSize: '12px' }} />}
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
