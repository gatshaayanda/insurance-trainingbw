'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  collection,
  getDocs,
  setDoc,
  doc,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { firestore } from '@/utils/firebaseConfig'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface Prospect {
  id: string
  name: string
  email?: string
  phone?: string
  relationship?: string
  tags?: string
  interest?: string
  status?: string
  notes: string[]
  user: string
}

export default function AdminMarketingOverview() {
  const router = useRouter()
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<Prospect | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    tags: '',
    interest: '',
    status: 'cold',
    note: '',
    assignedTo: '',
  })

  useEffect(() => {
    fetchProspectData()
  }, [])

  const fetchProspectData = async () => {
    const [contactsSnap, leadsSnap, notesSnap] = await Promise.all([
      getDocs(collection(firestore, 'marketing_contacts')),
      getDocs(collection(firestore, 'marketing_leads')),
      getDocs(collection(firestore, 'marketing_notes')),
    ])

    const map = new Map<string, Prospect>()

    contactsSnap.docs.forEach(doc => {
      const d = doc.data()
      const key = d.email || d.phone || d.name
      map.set(key, {
        id: doc.id,
        name: d.name,
        email: d.email,
        phone: d.phone,
        relationship: d.relationship,
        tags: d.tags,
        user: d.user,
        notes: [],
      })
    })

    leadsSnap.docs.forEach(doc => {
      const d = doc.data()
      const key = d.contact || d.name
      const existing = map.get(key) || { id: doc.id, name: d.name, notes: [], user: d.user }
      map.set(key, {
        ...existing,
        interest: d.interest,
        status: d.status,
      })
    })

    notesSnap.docs.forEach(doc => {
      const d = doc.data()
      const key = d.title
      const existing = map.get(key)
      if (existing) {
        existing.notes.push(d.content)
      }
    })

    setProspects(Array.from(map.values()))
    setLoading(false)
  }

  const assignProspect = async () => {
    const id = uuidv4()
    const {
      name,
      email,
      phone,
      relationship,
      tags,
      interest,
      status,
      note,
      assignedTo,
    } = form

    const user = assignedTo
    const contact = { name, email, phone, relationship, tags, user, addedAt: Timestamp.now() }
    const lead = { name, contact: phone, interest, status, user }
    const noteDoc = { title: email || name, content: note, user, createdAt: Timestamp.now() }

    await Promise.all([
      setDoc(doc(firestore, 'marketing_contacts', id), contact),
      setDoc(doc(firestore, `marketing_users/${user}/contacts`, id), contact),
      setDoc(doc(firestore, 'marketing_leads', id), lead),
      setDoc(doc(firestore, `marketing_users/${user}/leads`, id), lead),
      setDoc(doc(firestore, 'marketing_notes', id), noteDoc),
      setDoc(doc(firestore, `marketing_users/${user}/notes`, id), noteDoc),
    ])

    setForm({
      name: '',
      email: '',
      phone: '',
      relationship: '',
      tags: '',
      interest: '',
      status: 'cold',
      note: '',
      assignedTo: '',
    })
    setShowModal(false)
    fetchProspectData()
  }

  const downloadPDF = async () => {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save(`${selected?.name || 'prospect'}.pdf`)
  }

  const deleteProspect = async () => {
    if (!selected) return
    const id = selected.id
    const user = selected.user

    try {
      await Promise.all([
        deleteDoc(doc(firestore, 'marketing_contacts', id)),
        deleteDoc(doc(firestore, 'marketing_leads', id)),
        deleteDoc(doc(firestore, `marketing_users/${user}/contacts`, id)),
        deleteDoc(doc(firestore, `marketing_users/${user}/leads`, id)),
        // Notes are not uniquely linked by ID, so they are skipped for simplicity
      ])
      setSelected(null)
      fetchProspectData()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 Admin: Marketing Overview</h1>
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="text-sm text-blue-600 underline"
        >
          ← Back to Admin Dashboard
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Prospective Customers ({prospects.length})
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          + Assign New Prospect
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : prospects.length === 0 ? (
        <p className="italic text-gray-500">No prospects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prospects.slice(0, 5).map(p => (
            <div
              key={p.id}
              className="p-5 bg-white border shadow rounded cursor-pointer hover:shadow-md"
              onClick={() => setSelected(p)}
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">
                {p.email || p.phone || 'No contact info'}
              </p>
              {p.interest && <p>📌 Interest: {p.interest}</p>}
              {p.status && <p>🔥 Status: {p.status}</p>}
              {p.tags && <p>🏷️ Tags: {p.tags}</p>}
              {p.notes.length > 0 && (
                <p className="text-sm mt-1 text-gray-500 italic">
                  Note: {p.notes[0].slice(0, 60)}...
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for assigning new prospect */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-3 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold">Assign New Prospect</h2>
            {[['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['relationship', 'Relationship'], ['tags', 'Tags'], ['interest', 'Service Interest'], ['note', 'Initial Note'], ['assignedTo', 'Marketer Email']].map(([key, label]) => (
              <input
                key={key}
                type="text"
                placeholder={label}
                className="w-full border px-3 py-2 rounded"
                value={(form as any)[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
              />
            ))}
            <select
              className="w-full border px-3 py-2 rounded"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              {['cold', 'warm', 'hot', 'customer'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={assignProspect}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                Save Prospect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View full info modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div ref={cardRef} className="bg-white p-6 rounded shadow max-w-lg w-full space-y-4 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold">{selected.name}</h2>
            <p>📧 {selected.email || '—'}</p>
            <p>📞 {selected.phone || '—'}</p>
            <p>🔥 Status: {selected.status || '—'}</p>
            <p>📌 Interest: {selected.interest || '—'}</p>
            <p>🤝 Relationship: {selected.relationship || '—'}</p>
            <p>🏷️ Tags: {selected.tags || '—'}</p>
            <div>
              <h3 className="font-semibold mt-4 mb-1">📝 Notes</h3>
              {selected.notes.length === 0 ? (
                <p className="text-sm italic text-gray-500">No notes yet.</p>
              ) : (
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {selected.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button onClick={downloadPDF} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                🧾 Download PDF
              </button>
              <button onClick={deleteProspect} className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                🗑️ Delete Prospect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
