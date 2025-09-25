'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageContent from '@/components/LanguageContent';

interface MobileBottomNavProps {
  currentPage?: string;
}

export default function MobileBottomNav({ currentPage = '' }: MobileBottomNavProps) {
  const { t } = useLanguage();

  const navItems = [
    { 
      key: 'home', 
      href: '/', 
      label: 'nav.home', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      key: 'about', 
      href: '/about', 
      label: 'nav.about', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      key: 'services', 
      href: '/services', 
      label: 'nav.services', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      key: 'contact', 
      href: '/contact', 
      label: 'nav.contact', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    { 
      key: 'subscription', 
      href: '/subscription', 
      label: 'nav.subscription', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 safe-area-pb">
      <div className="flex items-center justify-between px-2 py-2 max-w-full overflow-hidden">
        {navItems.map((item) => (
          <LanguageContent key={item.key} fallback={
            <Link
              href={item.href}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors flex-1 min-w-0 ${
                currentPage === item.key 
                  ? 'text-yellow-500' 
                  : 'text-gray-400 hover:text-yellow-400'
              }`}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs font-medium truncate max-w-full">{item.label}</span>
            </Link>
          }>
            {(t) => (
              <Link
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors flex-1 min-w-0 ${
                  currentPage === item.key 
                    ? 'text-yellow-500' 
                    : 'text-gray-400 hover:text-yellow-400'
                }`}
              >
                <div className="mb-1">{item.icon}</div>
                <span className="text-xs font-medium truncate max-w-full">{t(item.label)}</span>
              </Link>
            )}
          </LanguageContent>
        ))}
      </div>
    </div>
  );
}
