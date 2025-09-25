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
    { key: 'home', href: '/', label: 'nav.home', icon: '🏠' },
    { key: 'about', href: '/about', label: 'nav.about', icon: 'ℹ️' },
    { key: 'services', href: '/services', label: 'nav.services', icon: '🍰' },
    { key: 'contact', href: '/contact', label: 'nav.contact', icon: '📞' },
    { key: 'subscription', href: '/subscription', label: 'nav.subscription', icon: '📝' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <LanguageContent key={item.key} fallback={
            <Link
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                currentPage === item.key 
                  ? 'text-yellow-500 bg-yellow-500/10' 
                  : 'text-gray-400 hover:text-yellow-400'
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          }>
            {(t) => (
              <Link
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                  currentPage === item.key 
                    ? 'text-yellow-500 bg-yellow-500/10' 
                    : 'text-gray-400 hover:text-yellow-400'
                }`}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs font-medium truncate">{t(item.label)}</span>
              </Link>
            )}
          </LanguageContent>
        ))}
      </div>
    </div>
  );
}
