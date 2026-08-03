'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, LogOut, Edit, Lock, Loader2 } from 'lucide-react';
import { profileSchema, passwordSchema } from '@/lib/validations';
import { getInitials } from '@/utils/helpers';
import StatCard from '@/components/ui/StatCard';
import { ClipboardList, CheckCircle, FileCheck } from 'lucide-react';

export default function ProfileView({ user, stats }) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, email: user.email, phone: user.phone },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  async function onUpdateProfile(data) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setMessage('Profil berhasil diperbarui');
      setEditMode(false);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onChangePassword(data) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setMessage('Password berhasil diubah');
      setPasswordMode(false);
      passwordForm.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  const inputClass =
    'w-full rounded-xl bg-white border border-mist-200 px-4 py-3 text-sm outline-none focus:border-current-400 transition-all';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="rounded-2xl bg-white border border-mist-200 p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-current-400 to-flow-500 grid place-items-center text-white font-display font-bold text-2xl">
            {getInitials(user.name)}
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-abyss-950">{user.name}</h2>
            <p className="text-sm text-slate-ink/55">{user.email}</p>
            <p className="text-sm text-slate-ink/45">{user.phone}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={ClipboardList} label="Total Laporan" value={stats.total} variant="flow" />
        <StatCard icon={CheckCircle} label="Diverifikasi" value={stats.verified} variant="current" />
        <StatCard icon={FileCheck} label="Selesai" value={stats.completed} variant="caution" />
      </div>

      {message && (
        <div className="rounded-xl bg-current-500/10 text-current-600 px-4 py-3 text-sm font-medium">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-critical/10 text-critical px-4 py-3 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Edit Profile */}
      {editMode ? (
        <div className="rounded-2xl bg-white border border-mist-200 p-6">
          <h3 className="font-display font-bold text-abyss-950 mb-4">Edit Profil</h3>
          <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Nama</label>
              <input {...profileForm.register('name')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input {...profileForm.register('email')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Nomor HP</label>
              <input {...profileForm.register('phone')} className={inputClass} />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-current-500 text-white font-semibold text-sm">
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="px-5 py-2.5 rounded-xl border border-mist-200 text-sm">
                Batal
              </button>
            </div>
          </form>
        </div>
      ) : passwordMode ? (
        <div className="rounded-2xl bg-white border border-mist-200 p-6">
          <h3 className="font-display font-bold text-abyss-950 mb-4">Ganti Password</h3>
          <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Password Saat Ini</label>
              <input type="password" {...passwordForm.register('currentPassword')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password Baru</label>
              <input type="password" {...passwordForm.register('newPassword')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Konfirmasi Password</label>
              <input type="password" {...passwordForm.register('confirmPassword')} className={inputClass} />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-current-500 text-white font-semibold text-sm">
                {loading ? 'Menyimpan...' : 'Ubah Password'}
              </button>
              <button type="button" onClick={() => setPasswordMode(false)} className="px-5 py-2.5 rounded-xl border border-mist-200 text-sm">
                Batal
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { setEditMode(true); setPasswordMode(false); setMessage(''); setError(''); }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-mist-200 font-semibold text-sm hover:border-current-400 transition-colors"
          >
            <Edit size={16} />
            Edit Profil
          </button>
          <button
            onClick={() => { setPasswordMode(true); setEditMode(false); setMessage(''); setError(''); }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-mist-200 font-semibold text-sm hover:border-current-400 transition-colors"
          >
            <Lock size={16} />
            Ganti Password
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-critical/10 text-critical font-semibold text-sm hover:bg-critical/15 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
