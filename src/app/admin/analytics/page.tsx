'use client'

import { BarChart2 } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Link from 'next/link'

export default function AnalyticsPage() {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 text-3xl font-bold">
        <BarChart2 size={32} /> Admin Analytics
      </div>

      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">📊 Real-Time Vercel Analytics</h2>
        <p className="text-gray-600 text-sm">
          This section uses <code>@vercel/analytics</code> to track page visits and performance.
        </p>
        <div className="border rounded p-4">
          <Analytics />
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">🚀 Speed Insights</h2>
        <p className="text-gray-600 text-sm">
          See how your app performs in production (hydration time, TTFB, etc).
        </p>
        <div className="border rounded p-4">
          <SpeedInsights />
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">📥 Firebase Event Tracking (Coming Soon)</h2>
        <p className="text-gray-600 text-sm">
          Once we start logging events (e.g. project created, login, etc), this section will show a summary.
        </p>
        <p className="text-xs text-gray-400 italic">
          To enable this, we'll log events to Firestore or export from Firebase Analytics to BigQuery.
        </p>
       <a
  href="https://console.firebase.google.com/project/_/analytics/app"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-500 underline text-sm"
>
  View Firebase Analytics Console →
</a>

      </section>
    </div>
  )
}
