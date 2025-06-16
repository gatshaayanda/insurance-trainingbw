'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientLoginPage() {
  const router = useRouter()
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/client-login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })

    if (res.ok) {
      const { email } = await res.json()

      // ✅ SET the role cookie directly on the browser
      document.cookie = `role=${encodeURIComponent(email)}; path=/; max-age=${60 * 60 * 24}`

      router.push('/client/dashboard')
    } else {
      const { error: msg } = await res.json()
      setError(msg || 'Login failed')
      setPw('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Client Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  )
}
