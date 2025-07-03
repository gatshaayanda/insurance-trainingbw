'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/utils/firebaseConfig';
import { translate } from '@/utils/translate';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/context/LanguageContext';

interface Blog {
  id: string;
  title: string;
  created_at: { seconds: number; nanoseconds: number };
}

interface Project {
  id: string;
  industry: string;
  progress_update: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { lang } = useLanguage();

  useEffect(() => {
    (async () => {
      const snap = await getDocs(
        query(collection(firestore, 'blogs'), orderBy('created_at', 'desc'))
      );

      const fetchedPosts = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Blog, 'id'>),
      }));

      setPosts(fetchedPosts);

      const translationsArray = await Promise.all(
        fetchedPosts.map(post => translate(post.title, lang))
      );

      const map: Record<string, string> = {};
      fetchedPosts.forEach((post, i) => {
        map[post.id] = translationsArray[i];
      });

      setTranslatedTitles(map);
      setLoading(false);
    })();
  }, [lang]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(collection(firestore, 'projects'));
        const docs = snap.docs
          .map(doc => ({
            id: doc.id,
            ...(doc.data() as Partial<Project>),
          }))
          .filter(
            p =>
              typeof p.industry === 'string' &&
              typeof p.progress_update === 'string' &&
              p.progress_update.trim() !== ''
          );
        setProjects(docs as Project[]);
      } catch (err) {
        console.error('Error loading project data:', err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        projects.length > 0 ? (prev + 1) % projects.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

  const t = (key: string) => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  if (loading) return <p className="text-center py-20">{t('blogLoading')}</p>;

  return (
    <main className="min-h-screen py-20 px-6 bg-[#F1F1F1] text-[#0B1A33] space-y-16">
      {/* Blog Intro */}
      <section className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">📰 {t('blogHeading')}</h1>
        <p className="text-[#4F5F7A]">{t('blogIntro')}</p>
      </section>

      {/* Blog List */}
      <section className="max-w-3xl mx-auto mt-12 space-y-6">
        {posts.length === 0 ? (
          <p className="italic text-center text-[#4F5F7A]">{t('blogEmpty')}</p>
        ) : (
          <ul className="space-y-8">
            {posts.map(post => (
              <li key={post.id} className="bg-white p-6 rounded shadow">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-2xl font-semibold text-blue-600 hover:underline"
                >
                  {translatedTitles[post.id] || post.title}
                </Link>
                <p className="mt-2 text-sm text-[#4F5F7A]">
                  {new Date(post.created_at.seconds * 1000).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Project Carousel */}
      <section className="max-w-md mx-auto text-center bg-white p-5 rounded shadow text-sm text-[#0F264B]">
        {loadingProjects ? (
          <p className="italic text-gray-500">Loading project updates...</p>
        ) : projects.length === 0 ? (
          <p className="italic text-gray-500">No public updates yet.</p>
        ) : (
          <>
            <p className="font-semibold">
              📊 {projects.length} active projects and counting!
            </p>
            <p className="mt-2 italic text-[#4F5F7A]">
              {projects[currentIndex]?.progress_update} <br />
              <span className="text-xs text-[#999]">
                — {projects[currentIndex]?.industry}
              </span>
            </p>
          </>
        )}
      </section>
    </main>
  );
}
