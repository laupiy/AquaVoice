# AquaVoice — User Side

This workspace contains the User Side for AquaVoice — a smart water monitoring platform.

Getting started

1. Install dependencies

```bash
npm install
```

2. Setup database (generate client, apply migrations, seed data)

```bash
npm run setup
```

3. Run development server

```bash
npm run dev
```

Demo credentials (seeded):

- Email: `user@aquavoice.id`
- Password: `password123`

Notes

- The app uses Next.js App Router. Pages are under `app/`.
- Prisma + SQLite are used for development. The seed script is `prisma/seed.js`.
- Tailwind CSS is configured in `tailwind.config.cjs` and styles under `app/globals.css`.
# AquaVoice — User Side

Platform monitoring kualitas air real-time berbasis IoT dan AI dengan fitur pelaporan masyarakat (community reporting).

## Tech Stack

- **Next.js 15** (App Router)
- **JavaScript** (bukan TypeScript)
- **Tailwind CSS v4**
- **Prisma ORM** + SQLite
- **React Hook Form** + **Zod**
- **Lucide React**, **React Leaflet**, **Recharts**, **Framer Motion**

## Quick Start

```bash
npm install
npm run setup
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Script `npm run setup`

Otomatis menjalankan:
1. Generate Prisma Client
2. Prisma Migration (membuat database jika belum ada)
3. Prisma Seed (mengisi dummy data)

> Jika database sudah ada, data existing **tidak dihapus** (seed menggunakan upsert).

## Demo Account

| Email | Password |
|-------|----------|
| `user@aquavoice.id` | `password123` |

## User Flow

```
Landing Page → Login/Register → Dashboard User
```

### Sidebar Menu
- Dashboard
- Water Map
- AquaVoice Report
- Alerts
- My Reports
- Profile

## Fitur Utama

- **Landing Page** — Hero, fitur, cara kerja, statistik, tentang, footer
- **Dashboard** — WQI, grafik monitoring (pH, suhu, DO, turbidity), Quick Voice Report
- **Water Map** — React Leaflet dengan filter status (Aman/Waspada/Bahaya)
- **AquaVoice Report** — Form laporan dengan voice note, speech-to-text, GPS
- **Alerts** — Notifikasi kualitas air dengan filter tingkat bahaya
- **My Reports** — Riwayat laporan dengan progress status
- **Profile** — Edit profil, ganti password, logout

## Struktur Folder

```
app/           → Next.js App Router pages & API routes
components/    → Reusable UI components
hooks/         → Custom React hooks
lib/           → Prisma, auth, validations
prisma/        → Schema, migrations, seed
services/      → Data service layer
utils/         → Helper functions
public/        → Static assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run setup` | Init database + seed |
| `npm run db:migrate` | Run migrations (dev) |
| `npm run db:seed` | Seed database only |

## Catatan

- Halaman **Admin** dikerjakan terpisah oleh anggota tim lain — tidak termasuk dalam repo ini (User Side only).
- Speech-to-Text membutuhkan browser Chrome/Edge dengan dukungan Web Speech API.
- GPS membutuhkan izin lokasi dari browser.
