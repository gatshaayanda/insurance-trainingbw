'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'

export default function CreateProjectPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    client_name: '',
    client_email: '',
    projectGoals: '',
    painPoints: '',
    pages: '',
    content: '',
    features: '',
    designPreferences: '',
    inspiration: '',
    mood: '',
  })

  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage('')
    setSuccess(false)

    try {
      await addDoc(collection(firestore, 'projects'), {
        ...form,
        admin_id: 'admin',
        created_at: serverTimestamp(),
      })

      setMessage('✅ Project created!')
      setSuccess(true)

      setForm({
        client_name: '',
        client_email: '',
        projectGoals: '',
        painPoints: '',
        pages: '',
        content: '',
        features: '',
        designPreferences: '',
        inspiration: '',
        mood: '',
      })
    } catch (err: any) {
      setMessage('❌ Error: ' + err.message)
      setSuccess(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-14 px-4">
      <button
        onClick={() => router.push('/admin/dashboard')}
        className="mb-4 text-sm text-gray-500 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Client Full Name"
          value={form.client_name}
          onChange={e => handleChange('client_name', e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          placeholder="Client Email"
          type="email"
          value={form.client_email}
          onChange={e => handleChange('client_email', e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {[
          ['projectGoals', 'Project Goals'],
          ['painPoints', 'Pain Points'],
          ['pages', 'Website Pages (Home, About, Contact...)'],
          ['content', 'What content do you already have?'],
          ['features', 'What features do you want?'],
          ['designPreferences', 'Design Preferences'],
          ['inspiration', 'Examples or Inspiration'],
          ['mood', 'What feeling or vibe should the site give?'],
        ].map(([field, placeholder]) => (
          <textarea
            key={field}
            placeholder={placeholder as string}
            value={form[field as keyof typeof form]}
            onChange={e => handleChange(field as string, e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>

        {message && (
          <p
            className={`font-semibold text-center ${
              success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
