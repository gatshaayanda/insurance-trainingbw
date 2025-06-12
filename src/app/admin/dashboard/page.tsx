// src/app/admin/dashboard/page.tsx
import { cookies }  from 'next/headers'
import { redirect } from 'next/navigation'
import ClientDashboard from './ClientDashboard'   // ← note the single dot, same folder

export default async function AdminDashboardPage() {
  // await the cookie store so .get() is available
  const cookieStore = await cookies()
  const token       = cookieStore.get('admin_token')?.value

  if (!token) {
    // if there's no admin_token, bounce to /login immediately
    redirect('/login')
  }

  // otherwise render your full dashboard UI
  return <ClientDashboard />
}
