'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, MicOff, MapPin } from 'lucide-react';

export default function VoiceRecorder({ onTranscript, value }) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  const startRecording = useCallback(() => {
    setError('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Browser tidak mendukung Speech-to-Text.');
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
      onTranscript(text);
    };

    recognition.onerror = () => {
      setError('Gagal merekam suara.');
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [onTranscript]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={`grid place-items-center w-12 h-12 rounded-xl transition-all ${
            isRecording
              ? 'bg-critical text-white'
              : 'bg-current-500/10 text-current-600 hover:bg-current-500/20'
          }`}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <div className="flex-1">
          <p className="text-sm font-medium text-abyss-950">
            {isRecording ? 'Merekam...' : 'Rekam Voice Note'}
          </p>
          <p className="text-xs text-slate-ink/45">Speech-to-Text otomatis</p>
        </div>
      </div>
      {value && (
        <div className="rounded-xl bg-mist-50 border border-mist-200 p-3 text-sm text-slate-ink/70">
          {value}
        </div>
      )}
      {error && <p className="text-xs text-critical">{error}</p>}
    </div>
  );
}

export function GpsLocation({ onLocationChange }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocation(loc);
          onLocationChange(loc);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, [onLocationChange]);

  return (
    <div className="flex items-center gap-2 rounded-xl bg-mist-50 border border-mist-200 px-4 py-3">
      <MapPin size={16} className="text-current-600 shrink-0" />
      <div className="text-sm">
        {loading ? (
          <span className="text-slate-ink/45">Mengambil lokasi GPS...</span>
        ) : location ? (
          <span className="text-slate-ink/70">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </span>
        ) : (
          <span className="text-slate-ink/45">Lokasi GPS tidak tersedia</span>
        )}
      </div>
    </div>
  );
}
