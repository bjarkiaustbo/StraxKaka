'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

interface AdminNavigationProps {
  currentPage: 'dashboard' | 'admin' | 'bank-transfers';
}

export default function AdminNavigation({ currentPage }: AdminNavigationProps) {
  const { t } = useLanguage();

  const navItems = [
    { key: 'dashboard', href: '/dashboard', label: 'Stjórnborð' },
    { key: 'admin', href: '/admin', label: 'Stjórnun' },
    { key: 'bank-transfers', href: '/admin/bank-transfers', label: 'Bankagreiðslur' }
  ];

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-yellow-500">StraxKaka</Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={
                  currentPage === item.key
                    ? "text-yellow-500 font-semibold"
                    : "text-gray-300 hover:text-yellow-400 transition-colors"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                <LanguageContent fallback="Til baka á heimasíðuna">
                  {(t) => t('nav.home')}
                </LanguageContent>
              </Link>
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
              <LanguageContent fallback="Til baka á heimasíðuna">
                {(t) => t('nav.home')}
              </LanguageContent>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
