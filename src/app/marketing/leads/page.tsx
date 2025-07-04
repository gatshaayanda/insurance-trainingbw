'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

interface Lead {
  id: string
  name: string
  contact: string
  interest: string
  status: string
  notes: string
}

export default function LeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    interest: '',
    status: 'cold',
    notes: '',
  })

  const userEmail =
    typeof document !== 'undefined'
      ? decodeURIComponent(
          document.cookie
            .split('; ')
            .find(row => row.startsWith('user='))?.split('=')[1] || ''
        )
      : ''

  useEffect(() => {
    const role = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='))?.split('=')[1]

    if (role !== 'marketing' || !userEmail) {
      router.replace('/marketing/login')
    } else {
      fetchLeads()
    }
  }, [router, userEmail])

  const fetchLeads = async () => {
    setLoading(true)
    const snap = await getDocs(
      collection(firestore, `marketing_users/${userEmail}/leads`)
    )
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Lead))
    setLeads(docs)
    setLoading(false)
  }

  const addLead = async () => {
    const id = uuidv4()
    const data = {
      ...formData,
      user: userEmail,
    }

    await Promise.all([
      setDoc(doc(firestore, `marketing_users/${userEmail}/leads`, id), data),
      setDoc(doc(firestore, `marketing_leads`, id), data),
    ])

    setFormData({ name: '', contact: '', interest: '', status: 'cold', notes: '' })
    setShowForm(false)
    fetchLeads()
  }

  const deleteLead = async (id: string) => {
    await Promise.all([
      deleteDoc(doc(firestore, `marketing_users/${userEmail}/leads`, id)),
      deleteDoc(doc(firestore, `marketing_leads`, id)),
    ])
    fetchLeads()
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">📇 Lead Tracker</h1>
          <button
            onClick={() => router.push('/marketing/dashboard')}
            className="text-sm text-blue-600 underline"
          >
            ← Back to Dashboard
          </button>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          + Add Lead
        </button>
      </div>

      {loading ? (
        <p>Loading leads...</p>
      ) : leads.length === 0 ? (
        <p className="italic text-gray-500">No leads added yet.</p>
      ) : (
        <ul className="space-y-4">
          {leads.map(lead => (
            <li key={lead.id} className="p-4 border rounded bg-white shadow">
              <h2 className="font-semibold">{lead.name}</h2>
              <p className="text-sm text-gray-600">{lead.contact}</p>
              <p><strong>Interest:</strong> {lead.interest}</p>
              <p><strong>Status:</strong> {lead.status}</p>
              <p className="text-sm italic text-gray-500">{lead.notes}</p>
              <button
                onClick={() => deleteLead(lead.id)}
                className="text-red-600 text-sm mt-2 underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold">Add New Lead</h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact info"
              className="w-full border px-3 py-2 rounded"
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
            />
            <input
              type="text"
              placeholder="Service interest"
              className="w-full border px-3 py-2 rounded"
              value={formData.interest}
              onChange={e => setFormData({ ...formData, interest: e.target.value })}
            />
            <select
              className="w-full border px-3 py-2 rounded"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
            </select>
            <textarea
              placeholder="Notes"
              className="w-full border px-3 py-2 rounded"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForm(false)}
                className="text-sm px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={addLead}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                Save Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
