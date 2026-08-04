'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send, Image, Video } from 'lucide-react';
import { reportSchema, REPORT_CATEGORIES } from '@/lib/validations';
import VoiceRecorder, { GpsLocation } from '@/components/report/VoiceRecorder';

export default function ReportForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [voiceNote, setVoiceNote] = useState('');
  const [location, setLocation] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [videoName, setVideoName] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportSchema),
  });

  const handleLocationChange = useCallback(
    (loc) => {
      setLocation(loc);
      if (loc) {
        setValue('latitude', loc.latitude);
        setValue('longitude', loc.longitude);
        setValue('location', `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`);
      }
    },
    [setValue]
  );

  const handleVoiceTranscript = useCallback(
    (text) => {
      setVoiceNote(text);
      setValue('voiceNote', text);
      if (!document.querySelector('[name="description"]')?.value) {
        setValue('description', text);
      }
    },
    [setValue]
  );

  async function onSubmit(data) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          voiceNote,
          latitude: location?.latitude,
          longitude: location?.longitude,
          location: data.location || (location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : null),
          photoUrl: photoName || null,
          videoUrl: videoName || null,
        }),
      });

      let result = null;
      try {
        result = await res.json();
      } catch {
        throw new Error('Server memberikan respons yang tidak valid. Coba lagi.');
      }

      if (!res.ok) {
        const message = result?.error || 'Gagal mengirim laporan';
        throw new Error(result?.detail ? `${message} (${result.detail})` : message);
      }

      router.push(`/report/success?number=${result.reportNumber}`);
    } catch (err) {
      const isNetworkFailure = err instanceof TypeError;
      setError(
        isNetworkFailure
          ? 'Tidak dapat terhubung ke server. Pastikan server berjalan lalu coba lagi.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full rounded-xl bg-white border border-mist-200 px-4 py-3 text-sm outline-none focus:border-current-400 focus:ring-2 focus:ring-current-400/15 transition-all';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-abyss-950 mb-1.5">Judul Laporan</label>
        <input {...register('title')} placeholder="Contoh: Air sungai berwarna hitam" className={inputClass} />
        {errors.title && <p className="mt-1 text-xs text-critical">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-abyss-950 mb-1.5">Kategori</label>
        <select {...register('category')} className={inputClass}>
          <option value="">Pilih kategori</option>
          {REPORT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-xs text-critical">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-abyss-950 mb-1.5">Deskripsi</label>
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Jelaskan kondisi air yang Anda temukan..."
          className={inputClass}
        />
        {errors.description && <p className="mt-1 text-xs text-critical">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-abyss-950 mb-1.5">Upload Foto</label>
        <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-mist-200 px-4 py-4 hover:border-current-400 transition-colors">
          <Image size={20} className="text-slate-ink/35" />
          <span className="text-sm text-slate-ink/55">
            {photoName || 'Pilih foto (JPG, PNG)'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setPhotoName(e.target.files?.[0]?.name || '')}
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-abyss-950 mb-1.5">Upload Video (Opsional)</label>
        <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-mist-200 px-4 py-4 hover:border-current-400 transition-colors">
          <Video size={20} className="text-slate-ink/35" />
          <span className="text-sm text-slate-ink/55">
            {videoName || 'Pilih video (MP4, MOV)'}
          </span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setVideoName(e.target.files?.[0]?.name || '')}
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-abyss-950 mb-1.5">Rekam Voice Note</label>
        <VoiceRecorder onTranscript={handleVoiceTranscript} value={voiceNote} />
      </div>

      <div>
        <label className="block text-sm font-medium text-abyss-950 mb-1.5">Lokasi GPS</label>
        <GpsLocation onLocationChange={handleLocationChange} />
      </div>

      {error && <p className="text-sm text-critical font-medium">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-current-500 to-flow-500 text-white font-semibold py-3.5 shadow-lg transition-all disabled:opacity-70"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {loading ? 'Mengirim...' : 'Kirim Laporan'}
      </button>
    </form>
  );
}
