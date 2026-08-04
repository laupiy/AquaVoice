import { NextResponse } from 'next/server';

/**
 * Centralised error responder for API routes.
 *
 * Every route in this project previously did:
 *   catch (error) {
 *     return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
 *   }
 *
 * That swallows the real error completely — nothing is logged, so a real
 * failure (bad DATABASE_URL, Prisma client out of sync, a locked SQLite
 * file, etc.) looks identical to "the server is fine but returned a vague
 * error". This helper always logs the real error to the server console
 * (so `next dev`/`next start` output tells you exactly what broke) and,
 * outside production, includes the real message in the JSON response so
 * it shows up in the browser/network tab too.
 */
export function apiError(context, error, status = 500) {
  // Always visible in the terminal running `next dev` / `next start`.
  console.error(`[API:${context}]`, error);

  const isProd = process.env.NODE_ENV === 'production';
  return NextResponse.json(
    {
      error: 'Terjadi kesalahan server',
      ...(!isProd && { detail: error?.message || String(error) }),
    },
    { status }
  );
}
