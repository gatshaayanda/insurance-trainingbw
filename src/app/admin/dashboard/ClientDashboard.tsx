// src/app/admin/dashboard/ClientDashboard.tsx
'use client'

import { useRouter } from 'next/navigation'
import {
  UserCircle,
  PlusCircle,
  Newspaper,
  Mail,
  BarChart2,
  LogOut,
} from 'lucide-react'

export default function ClientDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method:      'POST',
      credentials: 'include',
    })
    router.replace('/login')
  }

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <UserCircle size={32} /> Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 bg-white p-4 rounded shadow">
        <a href="/admin/project" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded">
          <PlusCircle size={16} /> New Project
        </a>
<a href="/admin/invite" className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded">
  <Mail size={16} /> Invite Client
</a>

        <a href="/admin/blog" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded">
          <Newspaper size={16} /> Write Blog
        </a>
        <a href="/admin/analytics" className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded">
          <BarChart2 size={16} /> View Analytics
        </a>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          ['Projects', 0],
          ['Active Clients', 0],
          ['Invites Pending', '—'],
          ['Draft Blogs', 0],
        ].map(([label, value]) => (
          <div key={label as string} className="bg-white p-4 rounded shadow text-center">
            <div className="text-xs uppercase text-gray-500">{label}</div>
            <div className="text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Projects</h2>
        <p className="italic text-gray-500">
          No projects yet. Click “New Project” above to get started.
        </p>
      </section>
    </div>
  )
}
