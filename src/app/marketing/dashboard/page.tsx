'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'

interface Prospect {
  id: string
  name: string
  email?: string
  phone?: string
  status?: string
  interest?: string
  notes: string[]
  relationship?: string
  tags?: string
}

export default function UnifiedProspectDashboard() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)

  const [newProspectData, setNewProspectData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    status: 'cold',
    relationship: '',
    tags: '',
    note: '',
  })

  useEffect(() => {
    const role = document.cookie.split('; ').find(r => r.startsWith('role='))?.split('=')[1]
    const user = document.cookie.split('; ').find(r => r.startsWith('user='))?.split('=')[1]

    if (role !== 'marketing' || !user) {
      router.replace('/marketing/login')
    } else {
      const userEmail = decodeURIComponent(user)
      setEmail(userEmail)
      const adminCheck = userEmail === 'admin@adminhub.dev'
      setIsAdmin(adminCheck)
      fetchAllData(userEmail, adminCheck)
    }
  }, [router])

  const fetchAllData = async (user: string, isAdmin: boolean) => {
    const prefix = isAdmin ? '' : `marketing_users/${user}/`

    const [contactsSnap, leadsSnap, notesSnap] = await Promise.all([
      getDocs(collection(firestore, isAdmin ? 'marketing_contacts' : `${prefix}contacts`)),
      getDocs(collection(firestore, isAdmin ? 'marketing_leads' : `${prefix}leads`)),
      getDocs(collection(firestore, isAdmin ? 'marketing_notes' : `${prefix}notes`)),
    ])

    const contactMap = new Map<string, Prospect>()

    contactsSnap.docs.forEach(doc => {
      const data = doc.data()
      const key = data.email || data.phone || data.name
      contactMap.set(key, {
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        relationship: data.relationship,
        tags: data.tags,
        notes: [],
      })
    })

    leadsSnap.docs.forEach(doc => {
      const data = doc.data()
      const key = data.contact || data.name
      if (contactMap.has(key)) {
        contactMap.set(key, {
          ...contactMap.get(key)!,
          status: data.status,
          interest: data.interest,
        })
      } else {
        contactMap.set(key, {
          id: doc.id,
          name: data.name,
          email: undefined,
          phone: data.contact,
          status: data.status,
          interest: data.interest,
          notes: [],
        })
      }
    })

    notesSnap.docs.forEach(doc => {
      const data = doc.data()
      const key = data.title
      if (contactMap.has(key)) {
        contactMap.get(key)!.notes.push(data.content)
      }
    })

    setProspects(Array.from(contactMap.values()))
  }

  const handleLogout = () => {
    document.cookie = 'role=; path=/; max-age=0;'
    document.cookie = 'user=; path=/; max-age=0;'
    router.replace('/marketing/login')
  }

  const updateSelectedProspect = async () => {
    if (!selectedProspect) return

    const updates = {
      status: selectedProspect.status,
      interest: selectedProspect.interest,
      phone: selectedProspect.phone,
      relationship: selectedProspect.relationship,
      tags: selectedProspect.tags,
    }

    try {
      await Promise.all([
        updateDoc(doc(firestore, 'marketing_contacts', selectedProspect.id), updates),
        updateDoc(doc(firestore, 'marketing_leads', selectedProspect.id), updates),
      ])

      if (!isAdmin) {
        await Promise.all([
          updateDoc(doc(firestore, `marketing_users/${email}/contacts`, selectedProspect.id), updates),
          updateDoc(doc(firestore, `marketing_users/${email}/leads`, selectedProspect.id), updates),
        ])
      }

      setEditMode(false)
      fetchAllData(email, isAdmin)
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  const addNoteToSelected = async () => {
    if (!newNote.trim() || !selectedProspect) return

    const noteData = {
      title: selectedProspect.email || selectedProspect.name || '',
      content: newNote,
      createdAt: new Date(),
      user: email,
    }

    await Promise.all([
      addDoc(collection(firestore, 'marketing_notes'), noteData),
      addDoc(collection(firestore, `marketing_users/${email}/notes`), noteData),
    ])

    setNewNote('')
    fetchAllData(email, isAdmin)
  }

  const deleteSelectedProspect = async () => {
    if (!selectedProspect) return
    try {
      await Promise.all([
        deleteDoc(doc(firestore, 'marketing_contacts', selectedProspect.id)),
        deleteDoc(doc(firestore, 'marketing_leads', selectedProspect.id)),
        deleteDoc(doc(firestore, `marketing_users/${email}/contacts`, selectedProspect.id)),
        deleteDoc(doc(firestore, `marketing_users/${email}/leads`, selectedProspect.id)),
      ])
      setSelectedProspect(null)
      fetchAllData(email, isAdmin)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const saveNewProspect = async () => {
    const contact = {
      name: newProspectData.name,
      email: newProspectData.email,
      phone: newProspectData.phone,
      relationship: newProspectData.relationship,
      tags: newProspectData.tags,
      user: email,
    }
    const lead = {
      name: newProspectData.name,
      contact: newProspectData.email || newProspectData.phone,
      interest: newProspectData.interest,
      status: newProspectData.status,
      user: email,
    }
    const note = {
      title: newProspectData.email || newProspectData.name || '',
      content: newProspectData.note,
      createdAt: new Date(),
      user: email,
    }

    try {
      await Promise.all([
        addDoc(collection(firestore, 'marketing_contacts'), contact),
        addDoc(collection(firestore, 'marketing_leads'), lead),
        addDoc(collection(firestore, `marketing_users/${email}/contacts`), contact),
        addDoc(collection(firestore, `marketing_users/${email}/leads`), lead),
      ])
      if (newProspectData.note.trim()) {
        await Promise.all([
          addDoc(collection(firestore, 'marketing_notes'), note),
          addDoc(collection(firestore, `marketing_users/${email}/notes`), note),
        ])
      }

      setNewProspectData({ name: '', email: '', phone: '', interest: '', status: 'cold', relationship: '', tags: '', note: '' })
      setShowNewModal(false)
      fetchAllData(email, isAdmin)
    } catch (err) {
      console.error('Error saving prospect:', err)
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">🔁 Prospect Conversion Tracker</h1>
          <p className="text-gray-600 mt-1">Logged in as <span className="font-medium">{email}</span></p>
        </div>
        <div className="space-x-2">
          <button onClick={() => setShowNewModal(true)} className="bg-green-600 text-white px-4 py-2 rounded text-sm">+ New Prospect</button>
          <button onClick={handleLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 text-sm font-medium">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {prospects.map(p => (
          <div key={p.id} className="bg-white border shadow p-5 rounded space-y-2 cursor-pointer hover:shadow-lg hover:ring-1 hover:ring-blue-500 transition"
            onClick={() => {
              setSelectedProspect(p)
              setEditMode(false)
              setNewNote('')
            }}>
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.email || p.phone}</p>
            {p.interest && <p>📌 Interest: {p.interest}</p>}
            {p.status && <p>🔥 Status: {p.status}</p>}
            {p.relationship && <p>🤝 {p.relationship}</p>}
            {p.tags && <p>🏷️ Tags: {p.tags}</p>}
            <p className="text-xs text-blue-600 mt-2 italic">Click to Open</p>
          </div>
        ))}
      </div>

      {selectedProspect && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-white max-w-xl w-full rounded-lg shadow-lg p-6 space-y-4 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setSelectedProspect(null)}>✕</button>
            <h2 className="text-xl font-bold mb-2">{selectedProspect.name}</h2>

            {!editMode ? (
              <div className="space-y-1 text-sm">
                <p>📧 Email: {selectedProspect.email || '—'}</p>
                <p>📞 Phone: {selectedProspect.phone || '—'}</p>
                <p>📌 Interest: {selectedProspect.interest || '—'}</p>
                <p>🔥 Status: {selectedProspect.status || '—'}</p>
                <p>🤝 Relationship: {selectedProspect.relationship || '—'}</p>
                <p>🏷️ Tags: {selectedProspect.tags || '—'}</p>
                <div className="flex space-x-2 mt-3">
                  <button onClick={() => setEditMode(true)} className="text-blue-600 text-sm underline">Edit Info</button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <input type="text" placeholder="Phone" value={selectedProspect.phone || ''} onChange={e => setSelectedProspect({ ...selectedProspect, phone: e.target.value })} className="w-full border px-3 py-1 rounded" />
                <input type="text" placeholder="Interest" value={selectedProspect.interest || ''} onChange={e => setSelectedProspect({ ...selectedProspect, interest: e.target.value })} className="w-full border px-3 py-1 rounded" />
                <select value={selectedProspect.status || 'cold'} onChange={e => setSelectedProspect({ ...selectedProspect, status: e.target.value })} className="w-full border px-3 py-1 rounded">
                  <option value="cold">Cold</option>
                  <option value="warm">Warm</option>
                  <option value="hot">Hot</option>
                  <option value="customer">Customer</option>
                </select>
                <input type="text" placeholder="Relationship" value={selectedProspect.relationship || ''} onChange={e => setSelectedProspect({ ...selectedProspect, relationship: e.target.value })} className="w-full border px-3 py-1 rounded" />
                <input type="text" placeholder="Tags" value={selectedProspect.tags || ''} onChange={e => setSelectedProspect({ ...selectedProspect, tags: e.target.value })} className="w-full border px-3 py-1 rounded" />
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setEditMode(false)} className="text-sm px-3 py-1 rounded border">Cancel</button>
                  <button onClick={updateSelectedProspect} className="bg-blue-600 text-white text-sm px-3 py-1 rounded">Save Changes</button>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold mt-4">📝 Notes</h3>
              {selectedProspect.notes.length === 0 ? (
                <p className="text-sm italic text-gray-500">No notes yet.</p>
              ) : (
                <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                  {selectedProspect.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              )}
              <div className="mt-4">
                <textarea className="w-full border px-3 py-2 rounded text-sm" placeholder="Add new note..." value={newNote} onChange={e => setNewNote(e.target.value)} />
                <button onClick={addNoteToSelected} className="bg-blue-600 text-white px-3 py-1 rounded text-sm mt-1">Add Note</button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={deleteSelectedProspect}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded mt-4"
              >
                🗑️ Delete Prospect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
