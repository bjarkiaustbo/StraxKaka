'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageContentProps {
  children: (t: (key: string) => string, language: string) => React.ReactNode;
  fallback?: React.ReactNode;
}

export default function LanguageContent({ children, fallback = null }: LanguageContentProps) {
  const { t, language, isHydrated } = useLanguage();

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children(t, language)}</>;
}

