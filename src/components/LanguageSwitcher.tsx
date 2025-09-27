'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, isHydrated } = useLanguage();

  // Don't render until hydrated to prevent hydration mismatch
  if (!isHydrated) {
    return (
      <div className="flex items-center space-x-3">
        <div className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-black">
          IS
        </div>
        <div className="px-3 py-1 rounded-full text-sm font-medium text-gray-300">
          EN
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => setLanguage('is')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'is'
            ? 'bg-yellow-500 text-black'
            : 'text-gray-300 hover:text-yellow-400'
        }`}
      >
        IS
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-yellow-500 text-black'
            : 'text-gray-300 hover:text-yellow-400'
        }`}
      >
        EN
      </button>
    </div>
  );
}
