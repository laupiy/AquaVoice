import { Radio, MapPin, Activity } from 'lucide-react'

// Node coordinates on a 500x300 canvas, expressed as percentages so the
// markers and the connecting SVG lines always line up regardless of size.
const nodes = [
  { id: 'a', x: 18, y: 30 },
  { id: 'b', x: 50, y: 18 },
  { id: 'c', x: 80, y: 37 },
  { id: 'd', x: 34, y: 62 },
]
const links = [
  ['a', 'b'],
  ['b', 'c'],
  ['a', 'd'],
  ['d', 'c'],
]
const markers = [
  { x: 24, y: 52 },
  { x: 86, y: 66 },
]

const findNode = (id) => nodes.find((n) => n.id === id)

export default function OceanIllustration() {
  return (
    <div className="relative w-full h-[300px] xl:h-[340px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-abyss-900 via-abyss-900 to-current-600/20">
      {/* ambient glow */}
      <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-flow-500/25 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-current-500/20 blur-3xl" />

      {/* network connections between sensor nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300" preserveAspectRatio="none">
        {links.map(([from, to], i) => {
          const a = findNode(from)
          const b = findNode(to)
          return (
            <line
              key={i}
              x1={(a.x / 100) * 500}
              y1={(a.y / 100) * 300}
              x2={(b.x / 100) * 500}
              y2={(b.y / 100) * 300}
              stroke="#5EEAD4"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              className="animate-dash"
            />
          )
        })}
      </svg>

      {/* sensor nodes */}
      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className="relative grid place-items-center w-8 h-8 rounded-xl bg-current-400/15 border border-current-300/30 text-current-300 backdrop-blur-sm">
            <span className="ripple absolute text-current-300/50" />
            <Radio size={14} strokeWidth={2.2} />
          </span>
        </div>
      ))}

      {/* location markers */}
      {markers.map((m, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <MapPin size={22} className="text-flow-400 drop-shadow-lg" fill="#0EA5E922" strokeWidth={2} />
        </div>
      ))}

      {/* dashboard visualization mockup */}
      <div className="absolute top-6 right-6 w-40 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-3 animate-float shadow-xl">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-current-200">
          <Activity size={12} />
          Water Quality Index
        </div>
        <p className="mt-1 font-mono-data text-xl font-bold text-white">92%</p>
        <div className="mt-2 flex items-end gap-1 h-8">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-current-400 to-flow-300"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* ocean waves */}
      <svg
        className="absolute -bottom-1 left-0 w-full animate-wave-a"
        viewBox="0 0 500 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,55 C90,85 160,25 250,50 C340,75 410,30 500,55 L500,100 L0,100 Z"
          fill="#14B8A6"
          fillOpacity="0.28"
        />
      </svg>
      <svg
        className="absolute -bottom-1 left-0 w-full animate-wave-b"
        viewBox="0 0 500 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,70 C100,40 180,90 280,65 C370,42 430,80 500,60 L500,100 L0,100 Z"
          fill="#0EA5E9"
          fillOpacity="0.22"
        />
      </svg>
    </div>
  )
}
