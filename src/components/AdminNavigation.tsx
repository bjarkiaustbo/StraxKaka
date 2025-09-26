'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdminNavigationProps {
  currentPage?: string;
}

export default function AdminNavigation({ currentPage = '' }: AdminNavigationProps) {
  const { t } = useLanguage();

  const navItems = [
    { key: 'dashboard', href: '/admin', label: 'Dashboard' },
    { key: 'bank-transfers', href: '/admin/bank-transfers', label: 'Bank Transfers' },
  ];

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold text-yellow-500">
              StraxKaka Admin
            </Link>
          </div>
          
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={currentPage === item.key 
                  ? "text-yellow-500 font-semibold" 
                  : "text-gray-300 hover:text-yellow-400 transition-colors"
                }
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
