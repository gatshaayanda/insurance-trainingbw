// src/app/api/marketing-login/route.ts
import { NextResponse } from 'next/server';

const MARKETING_USERS: Record<string, string> = {
  'marketingperson@example.com': process.env.MARKETING_PASSWORD_MARKETINGPERSON_EXAMPLE_COM!,
    'mingymotsumi@gmail.com': process.env.MARKETING_PASSWORD_MINGYMOTSUMI_GMAIL_COM!
  // Add more marketing users here as needed
};

export async function POST(req: Request) {
  const { password } = await req.json();

  const entry = Object.entries(MARKETING_USERS).find(([_, pw]) => pw === password);

  if (!entry) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const [email] = entry;

  return NextResponse.json({ success: true, email });
}
