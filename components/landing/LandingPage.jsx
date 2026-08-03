'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Waves,
  Activity,
  MapPinned,
  ClipboardList,
  BellRing,
  Brain,
  History,
  ArrowRight,
  Radio,
  Cpu,
  Users,
} from 'lucide-react';
import OceanIllustration from './OceanIllustration';

const features = [
  { icon: Activity, title: 'Monitoring Kualitas Air', desc: 'Pantau pH, suhu, oksigen terlarut, dan kekeruhan secara real-time.' },
  { icon: MapPinned, title: 'Water Map', desc: 'Visualisasi peta interaktif stasiun pemantauan di seluruh wilayah.' },
  { icon: ClipboardList, title: 'AquaVoice Report', desc: 'Laporkan pencemaran air dengan suara, foto, dan lokasi GPS.' },
  { icon: BellRing, title: 'Early Warning Alert', desc: 'Terima peringatan dini saat kualitas air menurun drastis.' },
  { icon: Brain, title: 'AI Prediction', desc: 'Prediksi kualitas air berbasis analisis AI dan data historis.' },
  { icon: History, title: 'Riwayat Pelaporan', desc: 'Lacak status laporan Anda dari verifikasi hingga selesai.' },
];

const steps = [
  { icon: Radio, step: '01', title: 'Sensor IoT', desc: 'Sensor IoT mengirim data kualitas air secara berkala ke server.' },
  { icon: Cpu, step: '02', title: 'Analisis AI', desc: 'AI menganalisis kualitas air secara real-time dan mendeteksi anomali.' },
  { icon: Users, step: '03', title: 'Informasi & Laporan', desc: 'Pengguna menerima informasi dan dapat melaporkan pencemaran.' },
];

export default function LandingPage({ stats }) {
  const statItems = [
    { label: 'Monitoring Station', value: stats?.monitoringStations || 5 },
    { label: 'Active Sensors', value: stats?.activeSensors || 48 },
    { label: 'Community Reports', value: stats?.communityReports || 231 },
    { label: 'Active Users', value: stats?.activeUsers || 1240 },
  ];

  return (
    <div className="min-h-screen bg-mist-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-abyss-950 via-abyss-900 to-abyss-800">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-current-500/10 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-flow-500/10 blur-3xl" />

        <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3">
            <span className="relative grid place-items-center w-10 h-10 rounded-2xl bg-current-500/15 text-current-300">
              <span className="ripple absolute text-current-400/60" />
              <Waves size={20} strokeWidth={2.2} />
            </span>
            <span className="font-display font-extrabold text-xl text-white tracking-tight">
              Aqua<span className="text-current-400">Voice</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-current-500 to-flow-500 text-white hover:shadow-lg hover:shadow-current-500/25 transition-all"
            >
              Daftar
            </Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-extrabold text-5xl lg:text-6xl text-white leading-[1.1]">
              Aqua<span className="text-current-400">Voice</span>
            </h1>
            <p className="mt-6 text-lg text-mist-100/70 leading-relaxed max-w-lg">
              Pantau kualitas air secara real-time, terima peringatan dini, dan berkontribusi
              menjaga lingkungan melalui pelaporan masyarakat.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-current-500 to-flow-500 text-white font-semibold shadow-lg shadow-current-500/25 hover:shadow-xl transition-all"
              >
                Masuk
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/register"
                className="px-6 py-3.5 rounded-xl text-white font-semibold border border-white/20 hover:bg-white/10 transition-colors"
              >
                Daftar
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OceanIllustration />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-3xl text-abyss-950">Fitur Unggulan</h2>
          <p className="mt-3 text-slate-ink/55 max-w-xl mx-auto">
            Solusi lengkap untuk monitoring kualitas air berbasis IoT, AI, dan partisipasi masyarakat.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-mist-200 p-6 hover:shadow-[0_8px_28px_-12px_rgba(11,42,66,0.18)] transition-shadow"
            >
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-current-500/10 text-current-600 mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="font-display font-bold text-abyss-950">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-ink/55 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-3xl text-abyss-950">Cara Kerja AquaVoice</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-current-500/10 to-flow-500/10 text-current-600 mb-4">
                  <s.icon size={28} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-abyss-950 text-white text-xs font-bold grid place-items-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-abyss-950">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-ink/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-abyss-950 to-abyss-800 p-6 text-center text-white"
            >
              <p className="font-mono-data font-bold text-4xl text-current-400">{s.value}+</p>
              <p className="mt-2 text-sm text-mist-100/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-3xl text-abyss-950">Tentang AquaVoice</h2>
          <p className="mt-6 text-slate-ink/65 leading-relaxed">
            AquaVoice mengintegrasikan teknologi IoT, Artificial Intelligence, dan partisipasi
            masyarakat untuk membantu pemantauan kualitas air secara real-time. Platform ini
            memungkinkan pengguna menerima peringatan dini, memantau kondisi air melalui peta
            interaktif, dan berkontribusi dalam mitigasi pencemaran air melalui pelaporan
            berbasis suara dan lokasi GPS.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-abyss-950 text-mist-100/60 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Waves size={20} className="text-current-400" />
              <span className="font-display font-bold text-white">AquaVoice</span>
            </div>
            <p className="text-sm">Smart Water Quality Monitoring & Early Warning System</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Tentang</h4>
            <ul className="space-y-2 text-sm">
              <li>Visi & Misi</li>
              <li>Tim Pengembang</li>
              <li>Teknologi</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li>info@aquavoice.id</li>
              <li>+62 812-3456-7890</li>
              <li>Bandung, Indonesia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Kebijakan Privasi</li>
              <li>Syarat & Ketentuan</li>
              <li>Media Sosial</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-abyss-800 text-center text-xs">
          © 2026 AquaVoice. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
