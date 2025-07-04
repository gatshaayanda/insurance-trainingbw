'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'
import { useRouter } from 'next/navigation'

export default function AllNotesPage() {
  const [notes, setNotes] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchNotes = async () => {
      const snap = await getDocs(collection(firestore, 'marketing_notes'))
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }

    fetchNotes()
  }, [])

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">💡 All Campaign Notes ({notes.length})</h1>
        <button
          onClick={() => router.push('/admin/marketing-overview')}
          className="text-sm text-blue-600 underline"
        >
          ← Back to Marketing Overview
        </button>
      </div>

      <ul className="space-y-4">
        {notes.map(note => (
          <li key={note.id} className="p-4 border rounded bg-white shadow">
            <h2 className="font-semibold">{note.title}</h2>
            <p className="text-sm text-gray-600">{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
