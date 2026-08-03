'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Send, MapPin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function QuickVoiceReport() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => setLocation(null)
      );
    }
  }, []);

  const startRecording = useCallback(() => {
    setError('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Browser tidak mendukung Speech-to-Text. Gunakan Chrome atau Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = () => {
      setError('Gagal merekam suara. Coba lagi.');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  async function handleSubmit() {
    if (!transcript.trim()) {
      setError('Rekam suara terlebih dahulu.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Voice Report - ${new Date().toLocaleDateString('id-ID')}`,
          category: 'Lainnya',
          description: transcript,
          voiceNote: transcript,
          latitude: location?.latitude,
          longitude: location?.longitude,
          location: location
            ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
            : 'Lokasi tidak tersedia',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim laporan');

      router.push(`/report/success?number=${data.reportNumber}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-abyss-950 via-abyss-900 to-current-600/30 border border-abyss-800 p-6 text-white">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display font-bold text-lg">Quick Voice Report</h3>
          <p className="text-sm text-mist-100/60 mt-1">
            Tekan mikrofon, bicara, dan kirim laporan instan dengan GPS otomatis.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-current-300 bg-current-500/10 px-3 py-1.5 rounded-full">
          <MapPin size={12} />
          {location ? 'GPS aktif' : 'GPS tidak tersedia'}
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`relative grid place-items-center w-16 h-16 rounded-full transition-all ${
            isRecording
              ? 'bg-critical text-white shadow-lg shadow-critical/30'
              : 'bg-current-500 text-white hover:bg-current-400 shadow-lg shadow-current-500/30'
          }`}
          aria-label={isRecording ? 'Stop rekam' : 'Mulai rekam'}
        >
          {isRecording && <span className="ripple absolute text-white/50" />}
          {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <div className="flex-1 w-full min-h-[60px] rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3">
          {transcript ? (
            <p className="text-sm text-mist-100/90">{transcript}</p>
          ) : (
            <p className="text-sm text-mist-100/40 italic">
              {isRecording ? 'Mendengarkan...' : 'Transkrip suara akan muncul di sini'}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !transcript.trim()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-abyss-950 font-semibold text-sm hover:bg-mist-100 transition-colors disabled:opacity-50 shrink-0"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          Kirim
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-critical-300 text-red-300">{error}</p>}
    </div>
  );
}
