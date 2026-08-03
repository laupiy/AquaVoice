import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Waves,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Activity,
  MapPinned,
  Wrench,
  Bot,
  ClipboardList,
  ArrowRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import OceanIllustration from '../components/OceanIllustration'

const features = [
  { icon: Activity, label: 'Real-time Water Monitoring' },
  { icon: MapPinned, label: 'Interactive GIS Map' },
  { icon: Wrench, label: 'Smart Mitigation' },
  { icon: Bot, label: 'AI Assistant' },
  { icon: ClipboardList, label: 'Community Reporting' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Email dan kata sandi wajib diisi.')
      return
    }
    setError('')
    setLoading(true)
    // No backend yet — simulate a short auth check, then hand off to the dashboard.
    setTimeout(() => {
      login({ email, remember })
      setLoading(false)
      navigate(redirectTo, { replace: true })
    }, 500)
  }

  return (
    <div className="min-h-screen flex bg-abyss-950">
      {/* LEFT — hero */}
      <div className="hidden lg:flex lg:w-[56%] xl:w-[58%] relative flex-col justify-center gap-10 px-12 xl:px-20 py-14 overflow-hidden bg-gradient-to-br from-abyss-950 via-abyss-900 to-abyss-800">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-current-500/10 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-flow-500/10 blur-3xl" />

        <div className="relative z-10 space-y-8 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="relative grid place-items-center w-11 h-11 rounded-2xl bg-current-500/15 text-current-300">
              <span className="ripple absolute text-current-400/50" />
              <Waves size={22} strokeWidth={2.2} />
            </span>
            <span className="font-display font-extrabold text-xl text-white tracking-tight">
              Aqua<span className="text-current-400">Voice</span>
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-4xl xl:text-5xl text-white leading-[1.1]">
              Aqua<span className="text-current-400">Voice</span>
            </h1>
            <p className="text-lg font-medium text-current-300">
              Smart Water Quality Monitoring &amp; Early Warning System
            </p>
            <p className="text-mist-100/60 leading-relaxed">
              Pantau kualitas air secara real-time dengan sensor IoT, Web GIS, rekomendasi
              mitigasi berbasis AI, dan laporan langsung dari masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
            {features.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 text-sm text-mist-100/80 ${
                  i === features.length - 1 ? 'col-span-2' : ''
                }`}
              >
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-current-300 shrink-0">
                  <Icon size={15} strokeWidth={2} />
                </span>
                {label}
              </div>
            ))}
          </div>

          <OceanIllustration />
        </div>
      </div>

      {/* RIGHT — login card */}
      <div className="flex-1 flex items-center justify-center relative px-5 py-10 sm:p-10 bg-gradient-to-br from-mist-50 to-flow-100/50">
        <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-abyss-950 to-abyss-800" />

        <div className="relative z-10 w-full max-w-md">
          {/* compact brand header, shown only when the hero panel is hidden */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <span className="relative grid place-items-center w-10 h-10 rounded-2xl bg-current-500/15 text-current-300">
              <span className="ripple absolute text-current-400/50" />
              <Waves size={20} strokeWidth={2.2} />
            </span>
            <span className="font-display font-extrabold text-lg text-white tracking-tight">
              Aqua<span className="text-current-400">Voice</span>
            </span>
          </div>

          <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_25px_70px_-20px_rgba(11,42,66,0.35)] p-8 sm:p-10">
            <div className="hidden lg:flex items-center gap-2.5 mb-6">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-current-500/10 text-current-600">
                <Waves size={18} strokeWidth={2.2} />
              </span>
              <span className="font-display font-bold text-abyss-950">AquaVoice</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl text-abyss-950">Welcome Back</h2>
            <p className="mt-1.5 text-sm text-slate-ink/55">
              Masuk untuk memantau kualitas air secara real-time.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label className="block text-sm font-medium text-abyss-950 mb-1.5">Email</label>
                <div className="flex items-center gap-2.5 rounded-xl bg-white border border-mist-200 px-3.5 py-3 focus-within:border-current-400 focus-within:ring-2 focus-within:ring-current-400/15 transition-all">
                  <Mail size={17} className="text-slate-ink/35 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@instansi.go.id"
                    className="w-full bg-transparent outline-none text-sm text-slate-ink placeholder:text-slate-ink/35"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-abyss-950 mb-1.5">
                  Kata Sandi
                </label>
                <div className="flex items-center gap-2.5 rounded-xl bg-white border border-mist-200 px-3.5 py-3 focus-within:border-current-400 focus-within:ring-2 focus-within:ring-current-400/15 transition-all">
                  <Lock size={17} className="text-slate-ink/35 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="w-full bg-transparent outline-none text-sm text-slate-ink placeholder:text-slate-ink/35"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-slate-ink/35 hover:text-slate-ink/60 shrink-0"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-critical font-medium">{error}</p>}

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 text-slate-ink/65 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded accent-current-500"
                  />
                  Ingat saya
                </label>
                <button
                  type="button"
                  className="font-medium text-current-600 hover:text-current-700"
                >
                  Lupa kata sandi?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-current-500 to-flow-500 text-white font-semibold py-3.5 shadow-lg shadow-current-500/25 hover:shadow-xl hover:shadow-current-500/30 transition-all disabled:opacity-70"
              >
                {loading ? 'Memverifikasi...' : 'Login'}
                {!loading && (
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-white/50 lg:text-slate-ink/40">
            © AquaVoice — Sistem Peringatan Dini Kualitas Air
          </p>
        </div>
      </div>
    </div>
  )
}
