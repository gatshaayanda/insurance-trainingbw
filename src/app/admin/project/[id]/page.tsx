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
