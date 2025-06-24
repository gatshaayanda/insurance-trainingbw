'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'
import AdminHubLoader from '@/components/AdminHubLoader'

export default function ViewProjectPage() {
  const router = useRouter()
  const { id } = useParams() as { id?: string }

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setError('Invalid project ID.')
      setLoading(false)
      return
    }

    ;(async () => {
      try {
        const snap = await getDoc(doc(firestore, 'projects', id))
        if (!snap.exists()) {
          throw new Error('Project not found.')
        }
        setProject(snap.data())
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <AdminHubLoader />
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>
  if (!project) return null

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Project Overview</h1>

      {/* 💬 Project Messages */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#0F264B] mb-4">💬 Project Messages</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded p-4 bg-gray-50">
          {/* Example Admin Bubble */}
          <div className="bg-blue-100 p-3 rounded-lg max-w-md ml-auto shadow">
            <p className="text-sm text-gray-800">
              We’ve updated the landing section as discussed.
            </p>
            <span className="text-xs text-right block mt-1 text-gray-500">Admin · 12:40 PM</span>
          </div>

          {/* Example Client Bubble */}
          <div className="bg-white border p-3 rounded-lg max-w-md shadow">
            <p className="text-sm text-gray-800">
              Looks great! Can you also change the button color to match our brand?
            </p>
            <span className="text-xs text-right block mt-1 text-gray-500">Client · 12:45 PM</span>
          </div>
        </div>

        <form onSubmit={() => {}} className="mt-6 space-y-3">
          <textarea
            placeholder="Type your message..."
            rows={3}
            className="w-full border p-3 rounded"
          />
          <input
            type="file"
            accept="image/*,application/pdf"
            className="block text-sm text-gray-500"
          />
          <input
            type="url"
            placeholder="Optional link"
            className="w-full border p-2 rounded text-sm"
          />
          <button
            type="submit"
            className="bg-[#0F264B] text-white px-5 py-2 rounded hover:brightness-110"
          >
            📤 Send Message
          </button>
        </form>
      </div>

        <h2 className="text-xl font-bold text-[#0F264B] mb-4">📋 Preliminary Intake Info</h2>

      <div className="space-y-3 text-sm">
        <Read label="Client Name" value={project.client_name} />
        <Read label="Client Email" value={project.client_email} />
        <Read label="Business" value={project.business} />
        <Read label="Industry" value={project.industry} />
        <Read label="Goals" value={project.goals} />
        <Read label="Pain Points" value={project.painpoints} />
        <Read label="Pages" value={project.pages} />
        <Read label="Content" value={project.content} />
        <Read label="Features" value={project.features} />
        <Read label="Design Preferences" value={project.design_prefs} />
        <Read label="Examples / Competitors" value={project.examples} />
        <Read label="Mood / Branding" value={project.mood} />
        <Read label="Progress Update" value={project.progress_update} />
        <Read label="Admin Notes" value={project.admin_notes} />
        <Read label="Client Admin Panel Access" value={project.admin_panel ? 'Yes' : 'No'} />

        {project.resource_link && (
          <div>
            <span className="font-semibold block">📎 Resource Link:</span>
            <a
              href={project.resource_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Open Shared File
            </a>
          </div>
        )}

        {project.live_revisable_draft_link && (
          <div>
            <span className="font-semibold block">🚀 Live Draft:</span>
            <a
              href={project.live_revisable_draft_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-semibold"
            >
              View Live Site
            </a>
          </div>
        )}
      </div>

      <button
        onClick={() => router.push('/admin/project')}
        className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Projects
      </button>
    </div>
  )
}

function Read({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <span className="font-semibold">{label}:</span>{' '}
      <span className="text-gray-800">{value?.toString().trim() || '—'}</span>
    </div>
  )
}
