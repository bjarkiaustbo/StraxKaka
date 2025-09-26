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
  ctaLink = '/subscription' 
}: NavigationProps) {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '/', label: 'nav.home' },
    { key: 'about', href: '/about', label: 'nav.about' },
    { key: 'services', href: '/services', label: 'nav.services' },
    { key: 'contact', href: '/contact', label: 'nav.contact' },
    { key: 'subscription', href: '/subscription', label: 'nav.subscription' }
  ];

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-yellow-500">StraxKaka</Link>
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
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher />
            <Link
              href="/straxlife"
              className="text-gray-300 hover:text-yellow-400 transition-colors text-xs md:text-sm font-medium"
            >
              StraxLife
            </Link>
            {showCTA && (
              <LanguageContent fallback={
                <Link href={ctaLink} className="bg-yellow-500 text-black px-3 md:px-6 py-1 md:py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold text-xs md:text-sm">
                  {t(ctaText)}
                </Link>
              }>
                {(t) => (
                  <Link href={ctaLink} className="bg-yellow-500 text-black px-3 md:px-6 py-1 md:py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold text-xs md:text-sm">
                    {t(ctaText)}
                  </Link>
                )}
              </LanguageContent>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800 fixed inset-x-0 top-16 z-50 max-h-screen overflow-y-auto">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-500 font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-yellow-400 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {navItems.map((item) => (
                <LanguageContent key={item.key} fallback={
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 text-lg rounded-lg transition-colors ${
                      currentPage === item.key 
                        ? 'text-yellow-500 font-semibold bg-yellow-500/10' 
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                }>
                  {(t) => (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-lg rounded-lg transition-colors ${
                        currentPage === item.key 
                          ? 'text-yellow-500 font-semibold bg-yellow-500/10' 
                          : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(item.label)}
                    </Link>
                  )}
                </LanguageContent>
              ))}
              
              <div className="pt-4 border-t border-gray-800">
                <Link
                  href="/straxlife"
                  className="block px-4 py-3 text-gray-300 hover:text-yellow-400 transition-colors text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  StraxLife
                </Link>
                {showCTA && (
                  <LanguageContent fallback={
                    <Link 
                      href={ctaLink} 
                      className="block px-4 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold text-center text-lg mt-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(ctaText)}
                    </Link>
                  }>
                    {(t) => (
                      <Link 
                        href={ctaLink} 
                        className="block px-4 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold text-center text-lg mt-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t(ctaText)}
                      </Link>
                    )}
                  </LanguageContent>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}

