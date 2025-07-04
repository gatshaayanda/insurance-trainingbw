'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  relationship: string
  tags: string
  addedAt: Timestamp
  user: string
}

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    tags: '',
  })

  useEffect(() => {
    const role = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='))?.split('=')[1]
    const user = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='))?.split('=')[1]

    if (role !== 'marketing' || !user) {
      router.replace('/marketing/login')
    } else {
      const email = decodeURIComponent(user)
      setUserEmail(email)
      setIsAdmin(email === 'admin@adminhub.dev')
    }
  }, [router])

  useEffect(() => {
    if (!userEmail) return
    fetchContacts()
  }, [userEmail])

  const fetchContacts = async () => {
    setLoading(true)
    const snap = await getDocs(collection(firestore, 'marketing_contacts'))
    const docs = snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Contact))
      .filter(c => isAdmin || c.user === userEmail)

    setContacts(docs.sort((a, b) => b.addedAt?.seconds - a.addedAt?.seconds))
    setLoading(false)
  }

  const addContact = async () => {
    const newContact = {
      ...formData,
      addedAt: Timestamp.now(),
      user: userEmail,
    }

    // Add to global collection
    await addDoc(collection(firestore, 'marketing_contacts'), newContact)

    // Add to user-specific collection
    await addDoc(
      collection(firestore, `marketing_users/${userEmail}/contacts`),
      newContact
    )

    setFormData({ name: '', email: '', phone: '', relationship: '', tags: '' })
    setShowForm(false)
    fetchContacts()
  }

  const deleteContact = async (id: string) => {
    await deleteDoc(doc(firestore, 'marketing_contacts', id))
    fetchContacts()
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">📇 Contact List</h1>
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
          + Add Contact
        </button>
      </div>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="italic text-gray-500">No contacts saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {contacts.map(c => (
            <li key={c.id} className="p-4 border rounded bg-white shadow">
              <h2 className="font-semibold">{c.name}</h2>
              <p className="text-sm text-gray-600">{c.email || c.phone}</p>
              <p><strong>Relationship:</strong> {c.relationship}</p>
              <p><strong>Tags:</strong> {c.tags}</p>
              {isAdmin || c.user === userEmail ? (
                <button
                  onClick={() => deleteContact(c.id)}
                  className="text-red-600 text-sm mt-2 underline"
                >
                  Delete
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold">Add New Contact</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email (optional)"
              className="w-full border px-3 py-2 rounded"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone (optional)"
              className="w-full border px-3 py-2 rounded"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Relationship (e.g. old client, family friend)"
              className="w-full border px-3 py-2 rounded"
              value={formData.relationship}
              onChange={e =>
                setFormData({ ...formData, relationship: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Tags (e.g. social, tech, influencer)"
              className="w-full border px-3 py-2 rounded"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForm(false)}
                className="text-sm px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={addContact}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
