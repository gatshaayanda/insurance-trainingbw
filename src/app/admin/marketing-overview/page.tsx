'use client'

import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import { collection, getDocs, setDoc, doc, Timestamp } from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function AdminMarketingOverview() {
  const [contacts, setContacts] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)

  const [leadData, setLeadData] = useState({
    name: '',
    contact: '',
    interest: '',
    status: 'cold',
    notes: '',
    assignedTo: '',
  })

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    tags: '',
    assignedTo: '',
  })

  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    assignedTo: '',
  })

  const router = useRouter()

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [contactsSnap, leadsSnap, notesSnap] = await Promise.all([
        getDocs(collection(firestore, 'marketing_contacts')),
        getDocs(collection(firestore, 'marketing_leads')),
        getDocs(collection(firestore, 'marketing_notes')),
      ])
      setContacts(contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLeads(leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setNotes(notesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (err) {
      console.error('Failed to load marketing data:', err)
    } finally {
      setLoading(false)
    }
  }

  const assignLead = async () => {
    const id = uuidv4()
    const data = {
      ...leadData,
      user: leadData.assignedTo,
    }

    await Promise.all([
      setDoc(doc(firestore, 'marketing_leads', id), data),
      setDoc(doc(firestore, `marketing_users/${leadData.assignedTo}/leads`, id), data),
    ])

    setLeadData({ name: '', contact: '', interest: '', status: 'cold', notes: '', assignedTo: '' })
    setShowLeadForm(false)
    fetchAllData()
  }

  const assignContact = async () => {
    const id = uuidv4()
    const data = {
      ...contactData,
      user: contactData.assignedTo,
      addedAt: Timestamp.now(),
    }

    await Promise.all([
      setDoc(doc(firestore, 'marketing_contacts', id), data),
      setDoc(doc(firestore, `marketing_users/${contactData.assignedTo}/contacts`, id), data),
    ])

    setContactData({ name: '', email: '', phone: '', relationship: '', tags: '', assignedTo: '' })
    setShowContactForm(false)
    fetchAllData()
  }

  const assignNote = async () => {
    const id = uuidv4()
    const data = {
      ...noteData,
      user: noteData.assignedTo,
      createdAt: Timestamp.now(),
    }

    await Promise.all([
      setDoc(doc(firestore, 'marketing_notes', id), data),
      setDoc(doc(firestore, `marketing_users/${noteData.assignedTo}/notes`, id), data),
    ])

    setNoteData({ title: '', content: '', assignedTo: '' })
    setShowNoteForm(false)
    fetchAllData()
  }

  const Section = ({
    title,
    items,
    path,
    renderItem,
    addButton,
  }: {
    title: string
    items: any[]
    path: string
    renderItem: (item: any) => JSX.Element
    addButton?: JSX.Element
  }) => (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title} ({items.length})</h2>
        {addButton}
      </div>
      {items.slice(0, 5).map(renderItem)}
      {items.length > 5 && (
        <button
          onClick={() => router.push(path)}
          className="text-sm text-blue-600 mt-2 underline"
        >
          View All →
        </button>
      )}
    </div>
  )

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

      {loading ? (
        <p>Loading marketing data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section
            title="📇 Leads"
            items={leads}
            path="/admin/marketing-overview/leads"
            renderItem={lead => (
              <div key={lead.id} className="mb-2">
                <p className="font-medium">{lead.name} — {lead.status}</p>
                <p className="text-sm text-gray-600">{lead.interest}</p>
              </div>
            )}
            addButton={
              <button
                onClick={() => setShowLeadForm(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                + Assign Lead
              </button>
            }
          />

          <Section
            title="📒 Contacts"
            items={contacts}
            path="/admin/marketing-overview/contacts"
            renderItem={contact => (
              <div key={contact.id} className="mb-2">
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.tags}</p>
              </div>
            )}
            addButton={
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                + Assign Contact
              </button>
            }
          />

          <Section
            title="💡 Notes"
            items={notes}
            path="/admin/marketing-overview/notes"
            renderItem={note => (
              <div key={note.id} className="mb-2">
                <p className="font-medium">{note.title}</p>
                <p className="text-sm text-gray-600 truncate">{note.content}</p>
              </div>
            )}
            addButton={
              <button
                onClick={() => setShowNoteForm(true)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                + Assign Note
              </button>
            }
          />
        </div>
      )}

      {/* MODALS */}
      {showLeadForm && (
        <AssignModal
          title="Assign New Lead"
          fields={leadData}
          setFields={setLeadData}
          onSave={assignLead}
          onCancel={() => setShowLeadForm(false)}
          inputs={[
            { key: 'name', label: 'Name' },
            { key: 'contact', label: 'Contact' },
            { key: 'interest', label: 'Interest' },
            { key: 'status', label: 'Status', type: 'select', options: ['cold', 'warm', 'hot'] },
            { key: 'notes', label: 'Notes' },
            { key: 'assignedTo', label: 'Marketer Email' },
          ]}
        />
      )}

      {showContactForm && (
        <AssignModal
          title="Assign New Contact"
          fields={contactData}
          setFields={setContactData}
          onSave={assignContact}
          onCancel={() => setShowContactForm(false)}
          inputs={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'relationship', label: 'Relationship' },
            { key: 'tags', label: 'Tags' },
            { key: 'assignedTo', label: 'Marketer Email' },
          ]}
        />
      )}

      {showNoteForm && (
        <AssignModal
          title="Assign New Note"
          fields={noteData}
          setFields={setNoteData}
          onSave={assignNote}
          onCancel={() => setShowNoteForm(false)}
          inputs={[
            { key: 'title', label: 'Title' },
            { key: 'content', label: 'Content' },
            { key: 'assignedTo', label: 'Marketer Email' },
          ]}
        />
      )}
    </div>
  )
}

function AssignModal({
  title,
  fields,
  setFields,
  onSave,
  onCancel,
  inputs,
}: {
  title: string
  fields: any
  setFields: (val: any) => void
  onSave: () => void
  onCancel: () => void
  inputs: {
    key: string
    label: string
    type?: 'text' | 'select'
    options?: string[]
  }[]
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {inputs.map(input => {
          if (input.type === 'select') {
            return (
              <select
                key={input.key}
                className="w-full border px-3 py-2 rounded"
                value={fields[input.key]}
                onChange={e => setFields({ ...fields, [input.key]: e.target.value })}
              >
                {input.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )
          }
          return (
            <input
              key={input.key}
              type="text"
              placeholder={input.label}
              className="w-full border px-3 py-2 rounded"
              value={fields[input.key]}
              onChange={e => setFields({ ...fields, [input.key]: e.target.value })}
            />
          )
        })}
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="text-sm px-3 py-1 rounded border">Cancel</button>
          <button onClick={onSave} className="bg-blue-600 text-white text-sm px-3 py-1 rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
