// src/app/api/login/route.ts
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  // …password check…
  const token = crypto.randomBytes(16).toString('hex')
  const res = NextResponse.json({ success: true })
  res.cookies.set({
    name:     'admin_token',
    value:    token,
    httpOnly: true,
    path:     '/',                  // COOKIE PATH
    maxAge:   60 * 60,
    sameSite: 'lax',
    secure:   process.env.NODE_ENV === 'production',
    // domain: optional—browser defaults to current host
  })
  return res
}
