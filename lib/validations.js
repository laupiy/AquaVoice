import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor HP minimal 10 digit'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

export const reportSchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter'),
  category: z.string().min(1, 'Kategori wajib dipilih'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  location: z.string().optional(),
  voiceNote: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor HP minimal 10 digit'),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Password saat ini wajib diisi'),
    newPassword: z.string().min(6, 'Password baru minimal 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

export const REPORT_CATEGORIES = [
  'Limbah Industri',
  'Sampah',
  'Perubahan Warna Air',
  'Bau Tidak Sedap',
  'Ikan Mati',
  'Lainnya',
];

export const REPORT_STATUS = {
  menunggu_verifikasi: 'Menunggu Verifikasi',
  diverifikasi: 'Diverifikasi',
  sedang_ditangani: 'Sedang Ditangani',
  selesai: 'Selesai',
};

export const STATUS_LABELS = {
  safe: 'Aman',
  warning: 'Waspada',
  critical: 'Bahaya',
};

export const ALERT_LEVEL_LABELS = {
  safe: 'Aman',
  warning: 'Waspada',
  critical: 'Bahaya',
};
