'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Waves,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { registerSchema } from '@/lib/validations';

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data) {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Registrasi gagal');
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'flex items-center gap-2.5 rounded-xl bg-white border border-mist-200 px-3.5 py-3 focus-within:border-current-400 focus-within:ring-2 focus-within:ring-current-400/15 transition-all';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-abyss-950 via-abyss-900 to-abyss-800 px-5 py-10">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-current-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="relative grid place-items-center w-10 h-10 rounded-2xl bg-current-500/15 text-current-300">
            <Waves size={20} strokeWidth={2.2} />
          </span>
          <span className="font-display font-extrabold text-lg text-white tracking-tight">
            Aqua<span className="text-current-400">Voice</span>
          </span>
        </div>

        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_25px_70px_-20px_rgba(11,42,66,0.35)] p-8 sm:p-10">
          <h2 className="font-display font-extrabold text-2xl text-abyss-950">Daftar</h2>
          <p className="mt-1.5 text-sm text-slate-ink/55">Buat akun untuk mulai memantau kualitas air.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
            <div>
              <label className="block text-sm font-medium text-abyss-950 mb-1.5">Nama Lengkap</label>
              <div className={inputClass}>
                <User size={17} className="text-slate-ink/35 shrink-0" />
                <input
                  {...register('name')}
                  placeholder="Nama lengkap"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-critical">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-abyss-950 mb-1.5">Email</label>
              <div className={inputClass}>
                <Mail size={17} className="text-slate-ink/35 shrink-0" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="email@example.com"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-critical">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-abyss-950 mb-1.5">Nomor HP</label>
              <div className={inputClass}>
                <Phone size={17} className="text-slate-ink/35 shrink-0" />
                <input
                  {...register('phone')}
                  placeholder="081234567890"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-critical">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-abyss-950 mb-1.5">Password</label>
              <div className={inputClass}>
                <Lock size={17} className="text-slate-ink/35 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-transparent outline-none text-sm"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-slate-ink/35">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-critical">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-abyss-950 mb-1.5">Konfirmasi Password</label>
              <div className={inputClass}>
                <Lock size={17} className="text-slate-ink/35 shrink-0" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  placeholder="Ulangi password"
                  className="w-full bg-transparent outline-none text-sm"
                />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="text-slate-ink/35">
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-critical">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && <p className="text-sm text-critical font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-current-500 to-flow-500 text-white font-semibold py-3.5 shadow-lg transition-all disabled:opacity-70 mt-2"
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-ink/55">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-current-600 hover:text-current-700">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
