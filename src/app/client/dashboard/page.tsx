'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { auth, firestore } from '@/utils/firebaseConfig';
import {
  LayoutDashboard,
  LogOut,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import AdminHubLoader from '@/components/AdminHubLoader';

interface Project {
  id: string;
  client_name?: string;
  business?: string;
  industry?: string;
  progress_update?: string;
  resource_link?: string;
  live_revisable_draft_link?: string;
}

export default function ClientDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [greeting, setGreeting] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      // Greeting
      const hour = new Date().getHours();
      let sal = hour < 12
        ? 'Good morning'
        : hour < 18
        ? 'Good afternoon'
        : 'Good evening';
      setGreeting(sal);

      try {
        // Fetch projects where client_id == uid
        const q = query(
          collection(firestore, 'projects'),
          where('client_id', '==', user.uid),
          orderBy('created_at', 'desc')
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
        setProjects(data);
      } catch (e: any) {
        console.error(e);
        setError('Failed to load your projects.');
      }

      setLoading(false);
    }

    load();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (loading) return <AdminHubLoader />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (projects.length === 0) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center">
        <LayoutDashboard className="mx-auto mb-2 w-10 h-10 text-blue-500" />
        <p className="text-xl text-gray-600 font-medium">
          {greeting}! You don’t have any projects yet.
        </p>
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {projects[0].client_name || 'Client'} 👋
          </h1>
          <p className="text-sm text-gray-600">{greeting}! Here are your projects:</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <h2 className="font-semibold text-gray-700">
                {p.business || p.client_name || p.id}
              </h2>
            </div>

            {p.industry && (
              <p className="text-gray-500 mb-1 italic">{p.industry}</p>
            )}

            <p className="mb-2">
              <span className="font-medium">Status:</span>{' '}
              {p.progress_update || (
                <span className="text-gray-400">No updates yet.</span>
              )}
            </p>

            {p.resource_link && (
              <a
                href={p.resource_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Shared File
              </a>
            )}

            {p.live_revisable_draft_link && (
              <a
                href={p.live_revisable_draft_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 font-bold text-blue-700 underline"
              >
                🚀 Live Draft
              </a>
            )}

            <Link
              href={`/client/project/${p.id}`}
              className="mt-4 inline-flex items-center gap-1 text-blue-700 hover:underline"
            >
              Open Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
