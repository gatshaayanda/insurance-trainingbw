'use client';

import { useState, useEffect } from 'react';
import { useRouter }            from 'next/navigation';
import { firestore }            from '@/utils/firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ClipboardList,
  SendHorizonal,
} from 'lucide-react';
import AdminHubLoader from '@/components/AdminHubLoader';

export default function CreateProjectPage() {
  const router = useRouter();
  const STORAGE_KEY = 'adminUnlocked';

  // prevent flash / re-route if not logged in
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== 'true') {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  // form state
  const [clientName, setClientName]         = useState('');
  const [clientEmail, setClientEmail]       = useState('');
  const [business, setBusiness]             = useState('');
  const [industry, setIndustry]             = useState('');
  const [goals, setGoals]                   = useState('');
  const [painpoints, setPainpoints]         = useState('');
  const [pages, setPages]                   = useState('');
  const [content, setContent]               = useState('');
  const [features, setFeatures]             = useState('');
  const [adminPanel, setAdminPanel]         = useState(false);
  const [designPrefs, setDesignPrefs]       = useState('');
  const [examples, setExamples]             = useState('');
  const [mood, setMood]                     = useState('');
  const [resourceLink, setResourceLink]     = useState('');
  const [adminNotes, setAdminNotes]         = useState('');
  const [progressUpdate, setProgressUpdate] = useState('');

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    try {
      await addDoc(collection(firestore, 'projects'), {
        // since we removed real auth, just tag a placeholder
        admin_id:      'admin',
        client_name:   clientName,
        client_email:  clientEmail,
        business,
        industry,
        goals,
        painpoints,
        pages,
        content,
        features,
        admin_panel:   adminPanel,
        design_prefs:  designPrefs,
        examples,
        mood,
        resource_link: resourceLink,
        admin_notes:   adminNotes,
        progress_update: progressUpdate,
        created_at:    serverTimestamp(),
      });

      setMessage('✅ Project created!');
      setSuccess(true);

      // reset form
      setClientName('');   setClientEmail('');
      setBusiness('');     setIndustry('');
      setGoals('');        setPainpoints('');
      setPages('');        setContent('');
      setFeatures('');     setAdminPanel(false);
      setDesignPrefs('');  setExamples('');
      setMood('');         setResourceLink('');
      setAdminNotes('');   setProgressUpdate('');
    } catch (err: any) {
      setMessage('❌ Error creating project: ' + err.message);
      setSuccess(false);
    }
  };

  if (loading) return <AdminHubLoader />;

  return (
    <div className="max-w-2xl mx-auto mt-14 px-4">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList className="w-8 h-8 text-blue-700" />
        <h1 className="text-3xl font-bold text-gray-800">Create New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow border border-blue-100 space-y-4">
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="Client Full Name"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-xl"
          />
          <input
            placeholder="Client Email"
            type="email"
            value={clientEmail}
            onChange={e => setClientEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-xl"
          />
          <input
            placeholder="Business Name"
            value={business}
            onChange={e => setBusiness(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl"
          />
          <select
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-xl"
          >
            <option value="">Select Industry</option>
            {[
              'Beauty','Church','Finance','Media','Events','Fashion',
              'Gaming','Education','eCommerce','Repair','Insurance',
              'Food & Beverage','Transport & Logistics','Other'
            ].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Resource Link */}
        <input
          placeholder="Google Docs / Sheets / File Link (optional)"
          value={resourceLink}
          onChange={e => setResourceLink(e.target.value)}
          className="w-full border px-3 py-2 rounded-xl"
        />

        {/* Goals & Painpoints */}
        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            placeholder="Project Goals"
            value={goals}
            onChange={e => setGoals(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
          <textarea
            placeholder="Pain Points"
            value={painpoints}
            onChange={e => setPainpoints(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
        </div>

        {/* Pages & Content */}
        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            placeholder="Pages"
            value={pages}
            onChange={e => setPages(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
        </div>

        {/* Features & Design */}
        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            placeholder="Features"
            value={features}
            onChange={e => setFeatures(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
          <textarea
            placeholder="Design Preferences"
            value={designPrefs}
            onChange={e => setDesignPrefs(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
        </div>

        {/* Examples & Mood */}
        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            placeholder="Examples / Inspiration"
            value={examples}
            onChange={e => setExamples(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
          <textarea
            placeholder="Mood / Branding"
            value={mood}
            onChange={e => setMood(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
          />
        </div>

        {/* Admin Panel Checkbox */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={adminPanel}
            onChange={e => setAdminPanel(e.target.checked)}
            className="mr-2"
          />
          <span>Client wants access to admin panel</span>
        </div>

        {/* Admin Notes & Progress Update */}
        <textarea
          placeholder="Admin Notes (Internal Only)"
          value={adminNotes}
          onChange={e => setAdminNotes(e.target.value)}
          className="w-full border px-3 py-2 rounded-xl bg-gray-100 min-h-[48px]"
        />
        <textarea
          placeholder="Progress Update (Client will see this)"
          value={progressUpdate}
          onChange={e => setProgressUpdate(e.target.value)}
          className="w-full border px-3 py-2 rounded-xl min-h-[48px]"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          <SendHorizonal className="w-5 h-5" /> Submit Project
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 px-4 py-3 text-center rounded-xl font-semibold ${
            success
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
