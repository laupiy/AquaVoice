import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, BellRing, Search, LogOut } from 'lucide-react'
import alerts from '../data/alerts.json'
import { useAuth } from '../context/AuthContext'

const titles = {
  '/': ['Dashboard', 'Ringkasan kondisi kualitas air hari ini'],
  '/peta': ['Peta Interaktif', 'Sebaran titik pemantauan di seluruh DAS'],
  '/monitoring': ['Monitoring Kualitas Air', 'Data sensor per parameter dan per stasiun'],
  '/mitigasi': ['Mitigasi Cerdas', 'Rekomendasi tindakan berbasis kondisi terkini'],
  '/laporan': ['Laporan Warga', 'Laporan kondisi air dari masyarakat'],
  '/peringatan': ['Pusat Peringatan', 'Riwayat dan status peringatan dini'],
  '/chatbot': ['AquaVoice Chatbot', 'Tanya jawab seputar kualitas air'],
}

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [title, subtitle] = titles[pathname] || titles['/']
  const activeAlerts = alerts.filter((a) => a.status !== 'selesai').length

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 h-20 flex items-center gap-4 px-5 lg:px-8 bg-mist-50/80 backdrop-blur-md border-b border-mist-200">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-lg text-abyss-900 hover:bg-mist-100"
        aria-label="Buka menu"
      >
        <Menu size={22} />
      </button>

      <div className="min-w-0">
        <h1 className="font-display font-bold text-xl text-abyss-950 truncate">{title}</h1>
        <p className="text-sm text-slate-ink/55 hidden sm:block">{subtitle}</p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 w-64 rounded-xl bg-white border border-mist-200 px-3 py-2 text-sm text-slate-ink/40 focus-within:border-current-400 transition-colors">
          <Search size={16} />
          <input
            type="text"
            placeholder="Cari stasiun, parameter..."
            className="w-full bg-transparent outline-none placeholder:text-slate-ink/35 text-slate-ink"
          />
        </div>

        <button
          className="relative grid place-items-center w-11 h-11 rounded-xl bg-white border border-mist-200 text-abyss-900 hover:border-current-400 transition-colors"
          aria-label="Notifikasi"
        >
          <BellRing size={19} />
          {activeAlerts > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-critical text-white text-[10px] font-semibold grid place-items-center">
              {activeAlerts}
            </span>
          )}
        </button>

        <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-mist-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-current-400 to-flow-500 grid place-items-center text-white font-display font-bold text-sm">
            AN
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-abyss-950">Anoy</p>
            <p className="text-xs text-slate-ink/50">Admin BPBD</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-1 grid place-items-center w-9 h-9 rounded-xl text-slate-ink/40 hover:bg-mist-100 hover:text-critical transition-colors"
            aria-label="Keluar"
            title="Keluar"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  )
}
