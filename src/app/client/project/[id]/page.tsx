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

      {/* 💬 Messaging Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#0F264B] mb-4">💬 Project Messages</h2>

        <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded p-4 bg-gray-50">
          <div className="bg-blue-100 p-3 rounded-lg max-w-md ml-auto shadow">
            <p className="text-sm text-gray-800">
              We’ve updated the landing section as discussed.
            </p>
            <span className="text-xs text-right block mt-1 text-gray-500">Admin · 12:40 PM</span>
          </div>
          <div className="bg-white border p-3 rounded-lg max-w-md shadow">
            <p className="text-sm text-gray-800">
              Looks great! Can you also change the button color to match our brand?
            </p>
            <span className="text-xs text-right block mt-1 text-gray-500">You · 12:45 PM</span>
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

      {/* Project Info Block */}
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
            <span className="font-semibold text-blue-700 block mb-1">Live Project Link:</span>
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
