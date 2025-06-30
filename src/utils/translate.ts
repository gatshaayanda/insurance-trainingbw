type Lang = 'en' | 'kr' | 'tn';

const langMap: Record<Lang, string> = {
  en: 'en',
  kr: 'ko', // ✅ ISO 639-1 code for Korean
  tn: 'tn', // Setswana
};

const getLang = (): Lang => {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('lang') as Lang) || 'en';
  }
  return 'en';
};

// 🔄 Runtime translation using MyMemory API
export async function translate(text: string, targetLang?: Lang): Promise<string> {
  const lang = targetLang || getLang();
  const isoLang = langMap[lang];

  if (isoLang === 'en' || !text) return text;

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${isoLang}`
    );
    const data = await res.json();
    const translated = data?.responseData?.translatedText;

    // Fallback to original if API returns empty or fails
    return translated && typeof translated === 'string' ? translated : text;
  } catch (err) {
    console.error('Translation API error:', err);
    return text;
  }
}

// 🧩 Static fallback translation (for key-based strings)
export function translateStatic(
  keyOrText: string | string[],
  translations?: Record<string, any>
): string {
  const lang = getLang();

  if (translations && typeof keyOrText === 'string') {
    return (
      translations[keyOrText]?.[lang] ||
      translations[keyOrText]?.en ||
      keyOrText
    );
  }

  if (typeof keyOrText === 'string') {
    if (lang === 'kr') return `[KR] ${keyOrText}`;
    if (lang === 'tn') return `[TN] ${keyOrText}`;
    return keyOrText;
  }

  return Array.isArray(keyOrText) ? keyOrText.join(' ') : keyOrText;
}
