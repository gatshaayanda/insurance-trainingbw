// src/app/api/client-login/route.ts
import { NextResponse } from 'next/server'

const CLIENTS: Record<string, string> = {
  'kaygatsha@gmail.com': process.env.CLIENT_PASSWORD_KAYGATSHA_GMAIL_COM!,
   'mingymotsumi@gmail.com': process.env.CLIENT_PASSWORD_MINGYMOTSUMI_GMAIL_COM!,
     'qmzxcv2@naver.com': process.env.CLIENT_PASSWORD_QMZXCV2_NAVER_COM!,  
   
       'gogontle.monnaatlala@bih.co.bw': process.env.CLIENT_PASSWORD_GOGONTLE_MONNAATLALA_BIH_CO_BW!,
  'nyashahill79@gmail.com': process.env.CLIENT_PASSWORD_NYASHAHILL79_GMAIL_COM!,
  'admin@smallbiz.org.bw': process.env.CLIENT_PASSWORD_ADMIN_SMALLBIZ_ORG_BW!,
  'kmathe84@gmail.com': process.env.CLIENT_PASSWORD_KMATHE84_GMAIL_COM!,
  'kesegorankonyana@gmail.com': process.env.CLIENT_PASSWORD_KESEGORANKONYANA_GMAIL_COM!,
  'leelati72@gmail.com': process.env.CLIENT_PASSWORD_LEELATI72_GMAIL_COM!,
  'blinmbaiwa@gmail.com': process.env.CLIENT_PASSWORD_BLINMBAIWA_GMAIL_COM!,
  'moloipako79@gmail.com': process.env.CLIENT_PASSWORD_MOLOIPAKO79_GMAIL_COM!,
  'tumoratheedi@gmail.com': process.env.CLIENT_PASSWORD_TUMORATHEEDI_GMAIL_COM!,
  'mapurazigeorge@gmail.com': process.env.CLIENT_PASSWORD_MAPURAZIGEORGE_GMAIL_COM!,
  'sportscenterbots@gmail.com': process.env.CLIENT_PASSWORD_SPORTSCENTERBOTS_GMAIL_COM!,
  'kopemichelle18@gmail.com': process.env.CLIENT_PASSWORD_KOPEMICHELLE18_GMAIL_COM!,
     // Add more emails and env keys here as needed
}

export async function POST(req: Request) {
  const { password } = await req.json()

  const entry = Object.entries(CLIENTS).find(([_, pw]) => pw === password)

  if (!entry) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const [email] = entry

  // Return the email to the client so they can set the cookie
  return NextResponse.json({ success: true, email })
}
