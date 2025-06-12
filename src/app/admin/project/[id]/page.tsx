'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import AdminHubLoader from '@/components/AdminHubLoader';

interface Project {
  id: string;
  client_name: string;
  client_email: string;
  business: string;
  industry: string;
  goals: string;
  painpoints: string;
  pages: string;
  content: string;
  features: string;
  design_prefs: string;
  examples: string;
  mood: string;
  resource_link: string;
  admin_notes: string;
  progress_update: string;
  admin_panel: boolean;
}

interface Props {
  params: {
    id: string;
  };
}

export default function AdminProjectEditPage({ params }: Props) {
  const router = useRouter();
  const projectId = params.id;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Error fetching project:', error.message);
      } else {
        setProject(data);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleChange = (field: keyof Project, value: string | boolean) => {
    if (project) {
      setProject({ ...project, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!project) return;

    setLoading(true);
    const { error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', project.id);

    setLoading(false);

    if (error) {
      console.error('Update error:', error.message);
      setMessage('❌ Failed to update project.');
    } else {
      setMessage('✅ Project updated successfully.');
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    const { error } = await supabase.from('projects').delete().eq('id', projectId);

    if (error) {
      console.error('Delete error:', error.message);
      alert('❌ Delete failed. Try again.');
    } else {
      alert('✅ Project deleted.');
      router.push('/admin/dashboard');
    }
  };

  if (!project) return <AdminHubLoader />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>

      {message && <p className="mb-4 text-green-700 font-semibold">{message}</p>}

      <div className="space-y-4">
        <Input label="Client Name" value={project.client_name} onChange={val => handleChange('client_name', val)} />
        <Input label="Client Email" value={project.client_email} onChange={val => handleChange('client_email', val)} />
        <Input label="Business Name" value={project.business} onChange={val => handleChange('business', val)} />

        <div>
          <label className="block font-semibold mb-1">Industry</label>
          <select
            value={project.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Industry</option>
            {["Beauty", "Church", "Finance", "Media", "Events", "Fashion", "Gaming", "Education", "eCommerce", "Repair", "Insurance", "Food & Beverage", "Transport & Logistics","Other"].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <Input label="Project Goals" value={project.goals} onChange={val => handleChange('goals', val)} />
        <Input label="Pain Points" value={project.painpoints} onChange={val => handleChange('painpoints', val)} />
        <Input label="Pages" value={project.pages} onChange={val => handleChange('pages', val)} />
        <Input label="Content" value={project.content} onChange={val => handleChange('content', val)} />
        <Input label="Features" value={project.features} onChange={val => handleChange('features', val)} />
        <Input label="Design Preferences" value={project.design_prefs} onChange={val => handleChange('design_prefs', val)} />
        <Input label="Examples / Inspiration" value={project.examples} onChange={val => handleChange('examples', val)} />
        <Input label="Mood / Branding" value={project.mood} onChange={val => handleChange('mood', val)} />
        <Input label="Client Resource Link" value={project.resource_link || ''} onChange={val => handleChange('resource_link', val)} />
        <Input label="Admin Notes (Internal)" value={project.admin_notes} onChange={val => handleChange('admin_notes', val)} />
        <Input label="Progress Update (Client Visible)" value={project.progress_update} onChange={val => handleChange('progress_update', val)} />

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={project.admin_panel}
            onChange={(e) => handleChange('admin_panel', e.target.checked)}
            className="mr-2"
          />
          <label>Client wants access to admin panel</label>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Project
        </button>

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

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        rows={2}
      />
    </div>
  );
}
