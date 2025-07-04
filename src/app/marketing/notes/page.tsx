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

interface Note {
  id: string
  title: string
  content: string
  createdAt: Timestamp
  user: string
}

export default function NotesPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
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
    fetchNotes()
  }, [userEmail])

  const fetchNotes = async () => {
    setLoading(true)
    const snap = await getDocs(collection(firestore, 'marketing_notes'))
    const docs = snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Note))
      .filter(n => isAdmin || n.user === userEmail)

    setNotes(docs.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds))
    setLoading(false)
  }

  const addNote = async () => {
    const newNote = {
      ...formData,
      createdAt: Timestamp.now(),
      user: userEmail,
    }

    await addDoc(collection(firestore, 'marketing_notes'), newNote)
    await addDoc(
      collection(firestore, `marketing_users/${userEmail}/notes`),
      newNote
    )

    setFormData({ title: '', content: '' })
    setShowForm(false)
    fetchNotes()
  }

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(firestore, 'marketing_notes', id))
    fetchNotes()
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">📝 Notes</h1>
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
          + Add Note
        </button>
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="italic text-gray-500">No notes saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map(n => (
            <li key={n.id} className="p-4 border rounded bg-white shadow">
              <h2 className="font-semibold">{n.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{n.content}</p>
              <p className="text-xs text-gray-400 italic">
                {new Date(n.createdAt?.seconds * 1000).toLocaleString()}
              </p>
              {(isAdmin || n.user === userEmail) && (
                <button
                  onClick={() => deleteNote(n.id)}
                  className="text-red-600 text-sm mt-2 underline"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold">Add New Note</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 rounded"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Note details..."
              className="w-full border px-3 py-2 rounded"
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForm(false)}
                className="text-sm px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={addNote}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
