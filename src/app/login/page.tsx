'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [pw, setPw]       = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/login', {
      method:      'POST',
      credentials: 'include',            // ← must be 'include'
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ password: pw }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      const { error: msg } = await res.json()
      setError(msg || 'Login failed')
      setPw('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">AdminHub Login</h2>
        <input
          type="password"
          placeholder="Admin Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <button type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  )
}
