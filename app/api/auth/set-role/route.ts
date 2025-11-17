import { NextResponse } from 'next/server';

export function GET(req: Request) {
  const url = new URL(req.url);
  const role = url.searchParams.get('role') ?? 'USER';
  const callbackUrl = url.searchParams.get('callbackUrl') ?? '/';

  const res = NextResponse.redirect(callbackUrl);
  // Set a non-httpOnly cookie so edge middleware (and client-side code) can read it.
  // Keep it short-lived (7 days) — adjust as needed.
  res.cookies.set('user-role', role, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
