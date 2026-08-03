import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Cari...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-ink/35" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-mist-200 bg-mist-50 pl-10 pr-9 py-2.5 text-sm text-abyss-950 placeholder:text-slate-ink/35 focus:outline-none focus:ring-2 focus:ring-current-400/40 focus:border-current-400 transition-shadow duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Bersihkan pencarian"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-ink/35 hover:text-abyss-950 transition-colors duration-200"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
