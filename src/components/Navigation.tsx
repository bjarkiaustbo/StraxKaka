'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

interface NavigationProps {
  currentPage?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export default function Navigation({ 
  currentPage = '', 
  showCTA = true, 
  ctaText = 'nav.start_now',
  ctaLink = '/contact' 
}: NavigationProps) {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '/', label: 'nav.home' },
    { key: 'about', href: '/about', label: 'nav.about' },
    { key: 'services', href: '/services', label: 'nav.services' },
    { key: 'contact', href: '/contact', label: 'nav.contact' },
    { key: 'subscription', href: '/subscription', label: 'nav.subscription' },
    { key: 'dashboard', href: '/dashboard', label: 'nav.dashboard' }
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
              <LanguageContent key={item.key} fallback={
                <Link 
                  href={item.href} 
                  className={currentPage === item.key 
                    ? "text-yellow-500 font-semibold" 
                    : "text-gray-300 hover:text-yellow-400 transition-colors"
                  }
                >
                  {item.label}
                </Link>
              }>
                {(t) => (
                  <Link 
                    href={item.href} 
                    className={currentPage === item.key 
                      ? "text-yellow-500 font-semibold" 
                      : "text-gray-300 hover:text-yellow-400 transition-colors"
                    }
                  >
                    {t(item.label)}
                  </Link>
                )}
              </LanguageContent>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {showCTA && (
              <LanguageContent fallback={
                <Link href={ctaLink} className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">
                  {t(ctaText)}
                </Link>
              }>
                {(t) => (
                  <Link href={ctaLink} className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">
                    {t(ctaText)}
                  </Link>
                )}
              </LanguageContent>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <LanguageContent key={item.key} fallback={
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-gray-300 hover:text-yellow-400 transition-colors ${
                      currentPage === item.key ? 'text-yellow-500 font-semibold' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                }>
                  {(t) => (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-gray-300 hover:text-yellow-400 transition-colors ${
                        currentPage === item.key ? 'text-yellow-500 font-semibold' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(item.label)}
                    </Link>
                  )}
                </LanguageContent>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

