'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'
import { useRouter } from 'next/navigation'

export default function AllContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchContacts = async () => {
      const snap = await getDocs(collection(firestore, 'marketing_contacts'))
      setContacts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }

    fetchContacts()
  }, [])

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📒 All Contacts ({contacts.length})</h1>
        <button
          onClick={() => router.push('/admin/marketing-overview')}
          className="text-sm text-blue-600 underline"
        >
          ← Back to Marketing Overview
        </button>
      </div>

      <ul className="space-y-4">
        {contacts.map(contact => (
          <li key={contact.id} className="p-4 border rounded bg-white shadow">
            <h2 className="font-semibold">{contact.name}</h2>
            <p className="text-sm">{contact.email || contact.phone}</p>
            <p><strong>Relationship:</strong> {contact.relationship}</p>
            <p><strong>Tags:</strong> {contact.tags}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
