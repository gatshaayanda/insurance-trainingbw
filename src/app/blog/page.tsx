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

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const { lang } = useLanguage();

  useEffect(() => {
    (async () => {
      const snap = await getDocs(
        query(collection(firestore, 'blogs'), orderBy('created_at', 'desc'))
      );

      const fetchedPosts = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Blog, 'id'>)
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

  const t = (key: string) => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  if (loading) return <p className="text-center py-20">{t('blogLoading')}</p>;

  return (
    <main className="min-h-screen py-20 px-6 bg-[#F1F1F1] text-[#0B1A33]">
      <section className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">📰 {t('blogHeading')}</h1>
        <p className="text-[#4F5F7A]">{t('blogIntro')}</p>
      </section>

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
    </main>
  );
}
