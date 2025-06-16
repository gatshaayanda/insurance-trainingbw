'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/utils/firebaseConfig'
import AdminHubLoader from '@/components/AdminHubLoader'

interface Project {
  id: string
  client_name: string
  business: string
  industry: string
  goals: string
  painpoints: string
  pages: string
  content: string
  features: string
  admin_panel: boolean
  design_prefs: string
  examples: string
  mood: string
  progress_update: string
  resource_link?: string
  live_revisable_draft_link?: string
}

export default function ClientProjectDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const email = (() => {
      try {
        return decodeURIComponent(
          document.cookie
            .split('; ')
            .find(row => row.startsWith('role='))?.split('=')[1] || ''
        )
      } catch {
        return ''
      }
    })()

    if (!email || !email.includes('@')) {
      router.replace('/client/login')
      return
    }

    const fetchProject = async () => {
      try {
        const ref = doc(firestore, 'projects', id as string)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          setError('Project not found.')
          return
        }

        const data = snap.data()
        if (data.client_email !== email) {
          setError('Unauthorized to view this project.')
          return
        }

        setProject({ id: snap.id, ...data } as Project)
      } catch (err) {
        setError('Error loading project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, router])

  if (loading) return <AdminHubLoader />
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>
  if (!project) return null

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 font-inter">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AdminHub Project Overview</h1>
          <p className="text-sm text-[#D3AA2D] font-medium mt-1">
            Your Digital Partner — From Idea to Launch, With You Every Step of the Way.
          </p>
        </div>
        <button
          onClick={() => router.push('/client/dashboard')}
          className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300 font-semibold"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="border p-6 rounded-2xl shadow-xl bg-white space-y-4">
        <ReadLine label="Business" value={project.business} />
        <ReadLine label="Industry" value={project.industry} />
        <ReadLine label="Goals" value={project.goals} />
        <ReadLine label="Pain Points" value={project.painpoints} />
        <ReadLine label="Pages" value={project.pages} />
        <ReadLine label="Content" value={project.content} />
        <ReadLine label="Features" value={project.features} />
        <ReadLine label="Admin Panel Access" value={project.admin_panel ? 'Yes' : 'No'} />
        <ReadLine label="Design Preferences" value={project.design_prefs} />
        <ReadLine label="Examples / Competitor Sites" value={project.examples} />
        <ReadLine label="Mood / Branding" value={project.mood} />

        <div>
          <span className="font-semibold text-blue-700 block mb-1">Progress Update:</span>
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4 text-blue-900 text-base font-medium shadow-inner min-h-[44px]">
            {project.progress_update?.trim() || (
              <span className="text-gray-400">No updates yet.</span>
            )}
          </div>
        </div>

        {project.resource_link && (
          <div className="mt-2">
            <span className="font-semibold text-gray-700 block mb-1">Shared Resource Link:</span>
            <a
              href={project.resource_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              📄 Open Document
            </a>
          </div>
        )}

        {project.live_revisable_draft_link && (
          <div className="mt-4">
            <span className="font-semibold text-blue-700 block mb-1"> Live Project Link:</span>
            <a
              href={project.live_revisable_draft_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-bold underline text-lg"
            >
              🚀 Open Site/App
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function ReadLine({ label, value }: { label: string; value: string | boolean }) {
  return (
    <div className="text-sm">
      <span className="block font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-800">
        {value?.toString().trim() || <span className="text-gray-400">—</span>}
      </span>
    </div>
  )
}
