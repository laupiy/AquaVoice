'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function VoiceRecorder({ onTranscriptChange, onAudioRecorded }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Inisialisasi Web Speech API (Browser Native)
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'id-ID'; // Bahasa Indonesia

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          if (onTranscriptChange) onTranscriptChange(currentTranscript);
        };

        recognition.onerror = (event) => {
          console.warn('Speech Recognition Warning:', event.error);
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onTranscriptChange]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        if (onAudioRecorded) onAudioRecorded(url);
      };

      mediaRecorderRef.current.start();
      if (recognitionRef.current) recognitionRef.current.start();

      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Izin akses mikrofon diperlukan untuk merekam suara laporan.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignored
      }
    }

    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card-base p-6 bg-gradient-to-br from-white via-cyan-50/20 to-blue-50/30">
      <div className="text-center max-w-md mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full">
          Teknologi Speech-to-Text
        </span>
        <h3 className="text-xl font-extrabold text-slate-800 mt-2">
          Rekam Laporan Suara (Voice Note)
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Bicarakan kondisi air yang Anda temukan. Sistem akan mengubah ucapan menjadi teks otomatis secara real-time.
        </p>

        {/* Record Interactive Button */}
        <div className="my-6 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isRecording
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse ring-8 ring-rose-200'
                : 'bg-gradient-to-tr from-cyan-500 to-blue-600 hover:scale-105 text-white ring-4 ring-cyan-100'
            }`}
          >
            {isRecording ? (
              <span className="text-2xl">⏹️</span>
            ) : (
              <span className="text-3xl">🎙️</span>
            )}
          </button>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-300'
              }`}
            />
            <span className="text-sm font-bold text-slate-700">
              {isRecording ? `Merekam... ${formatTime(recordingTime)}` : 'Klik mikrofon untuk bicara'}
            </span>
          </div>
        </div>

        {/* Audio Player Preview */}
        {audioUrl && !isRecording && (
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm mb-4">
            <p className="text-[11px] font-bold text-slate-500 mb-1">Pratinjau Rekaman Suara:</p>
            <audio src={audioUrl} controls className="w-full h-8" />
          </div>
        )}

        {!isSupported && (
          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg mt-2">
            ⚠️ Browser Anda tidak mendukung Web Speech API bawaan. Anda masih dapat mengetik deskripsi secara manual.
          </p>
        )}
      </div>
    </div>
  );
}