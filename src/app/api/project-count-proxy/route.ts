import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://nxdymyskgqnsdaoznocl.supabase.co/rest/v1/rpc/get_total_project_count', {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
    cache: 'no-store',
  });

  try {
    const result = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: result }, { status: 500 });
    }
    return NextResponse.json({ total: result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse JSON response from Supabase' }, { status: 500 });
  }
}
