'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  collection,
  getCountFromServer,
} from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'

export default function MarketingDashboard() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [stats, setStats] = useState({
    leads: 0,
    quotes: 0,
    contacts: 0,
    notes: 0,
  })
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const roleCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('role=')) || ''
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user=')) || ''

    const role = decodeURIComponent(roleCookie.split('=')[1] || '')
    const user = decodeURIComponent(userCookie.split('=')[1] || '')

    if (role !== 'marketing' || !user) {
      router.replace('/marketing/login')
      return
    }

    setEmail(user)
    setIsAdmin(user === 'admin@adminhub.dev')
    fetchStats(user, user === 'admin@adminhub.dev')
  }, [router])

  const fetchStats = async (user: string, isAdmin: boolean) => {
    try {
      const prefix = isAdmin ? 'marketing_' : `marketing_users/${user}/`

      const [leadsSnap, quotesSnap, contactsSnap, notesSnap] = await Promise.all([
        getCountFromServer(collection(firestore, `${prefix}leads`)),
        getCountFromServer(collection(firestore, `${prefix}quotes`)),
        getCountFromServer(collection(firestore, `${prefix}contacts`)),
        getCountFromServer(collection(firestore, `${prefix}notes`)),
      ])

      setStats({
        leads: leadsSnap.data().count,
        quotes: quotesSnap.data().count,
        contacts: contactsSnap.data().count,
        notes: notesSnap.data().count,
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      setStats({ leads: 0, quotes: 0, contacts: 0, notes: 0 })
    }
  }

  const handleLogout = () => {
    document.cookie = 'role=; path=/; max-age=0;'
    document.cookie = 'user=; path=/; max-age=0;'
    router.replace('/marketing/login')
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">📊 Marketing Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Logged in as <span className="font-medium">{email}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 text-sm font-medium"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <DashboardCard
          title="📇 Leads"
          description="View and manage potential client leads for AdminHub services."
          count={stats.leads}
          href="/marketing/leads"
        />

        <DashboardCard
          title="📒 Contact List"
          description="Log and manage contacts from your personal network or events."
          count={stats.contacts}
          href="/marketing/contacts"
        />
        <DashboardCard
          title="💡 Campaign Ideas"
          description="Track content ideas, outreach attempts, and marketing notes."
          count={stats.notes}
          href="/marketing/notes"
        />
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  description,
  href,
  count,
}: {
  title: string
  description: string
  href: string
  count: number
}) {
  return (
    <a
      href={href}
      className="block border p-5 rounded-lg bg-white shadow hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {count} total
        </span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-blue-600 text-sm inline-block mt-2">
        Go to {title.split(' ')[1]} →
      </span>
    </a>
  )
}
