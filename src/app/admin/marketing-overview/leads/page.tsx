'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'
import { useRouter } from 'next/navigation'

export default function AllLeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchLeads = async () => {
      const snap = await getDocs(collection(firestore, 'marketing_leads'))
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }

    fetchLeads()
  }, [])

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📇 All Leads ({leads.length})</h1>
        <button
          onClick={() => router.push('/admin/marketing-overview')}
          className="text-sm text-blue-600 underline"
        >
          ← Back to Marketing Overview
        </button>
      </div>

      <ul className="space-y-4">
        {leads.map(lead => (
          <li key={lead.id} className="p-4 border rounded bg-white shadow">
            <h2 className="font-semibold">{lead.name}</h2>
            <p className="text-sm text-gray-600">{lead.contact}</p>
            <p><strong>Interest:</strong> {lead.interest}</p>
            <p><strong>Status:</strong> {lead.status}</p>
            <p className="text-sm italic text-gray-500">{lead.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
