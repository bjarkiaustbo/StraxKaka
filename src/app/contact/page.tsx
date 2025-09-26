'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import MobileBottomNav from '@/components/MobileBottomNav';
import Image from 'next/image';

export default function Contact() {
  const { t } = useLanguage();
  const [selectedContactMethod, setSelectedContactMethod] = useState<'email' | 'phone' | 'support'>('email');
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const contactMethods = [
    {
      id: 'email',
      titleKey: 'contact.support.email.title',
      descriptionKey: 'contact.support.email.desc',
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      contact: 'orders.straxkaka@outlook.com',
      action: 'mailto:orders.straxkaka@outlook.com',
      actionKey: 'contact.support.email.action',
      color: 'yellow'
    },
    {
      id: 'phone',
      titleKey: 'contact.support.phone.title',
      descriptionKey: 'contact.support.phone.desc',
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      contact: '+354 790 4777',
      action: 'tel:+3547904777',
      actionKey: 'contact.support.phone.action',
      color: 'amber'
    },
    {
      id: 'support',
      titleKey: 'contact.support.hours.title',
      descriptionKey: 'contact.support.hours.desc',
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      contact: '9:00 AM - 5:00 PM GMT',
      action: null,
      actionKey: null,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 md:pb-0">
      <Navigation currentPage="contact" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image 
              src="/logo.svg" 
              alt="StraxKaka Logo" 
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('contact.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-600">
              {t('contact.info.subtitle')}
            </p>
          </div>

          {/* Contact Method Tabs */}
          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-8">
              {contactMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedContactMethod(method.id as 'email' | 'phone' | 'support')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedContactMethod === method.id
                      ? `bg-${method.color}-500 text-black shadow-lg`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t(method.titleKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Contact Method */}
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <div
                key={method.id}
                className={`text-center p-8 rounded-2xl transition-all duration-300 ${
                  selectedContactMethod === method.id
                    ? `bg-gradient-to-br from-${method.color}-50 to-${method.color}-100 shadow-lg scale-105`
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`bg-${method.color}-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t(method.titleKey)}</h3>
                <p className="text-gray-600 mb-6">{t(method.descriptionKey)}</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{method.contact}</span>
                    <button
                      onClick={() => copyToClipboard(method.contact)}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                      title="Copy to clipboard"
                    >
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  {method.action && (
                    <a
                      href={method.action}
                      className={`inline-block bg-${method.color}-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-${method.color}-400 transition-colors`}
                    >
                      {method.actionKey ? t(method.actionKey) : 'View Hours'}
                    </a>
                  )}
                  {isCopied && (
                    <div className="text-green-600 text-sm font-medium">
                      ✓ Copied to clipboard!
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-500">StraxKaka</h3>
              <p className="text-gray-400">
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">{t('footer.services.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('footer.services.birthday')}</li>
                <li>{t('footer.services.ai')}</li>
                <li>{t('footer.services.ordering')}</li>
                <li>{t('footer.services.delivery')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">{t('footer.company.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-yellow-400">{t('nav.about')}</a></li>
                <li><a href="/contact" className="hover:text-yellow-400">{t('nav.contact')}</a></li>
                <li><a href="/services" className="hover:text-yellow-400">{t('footer.company.pricing')}</a></li>
                <li><a href="/blog/workplace-celebrations" className="hover:text-yellow-400">{t('footer.company.blog')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">{t('footer.contact.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('common.email')}</li>
                <li>{t('common.phone')}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">{t('footer.legal.title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-yellow-400">{t('footer.legal.privacy')}</a></li>
                <li><a href="/terms" className="hover:text-yellow-400">{t('footer.legal.terms')}</a></li>
                <li><a href="/cookies" className="hover:text-yellow-400">{t('footer.legal.cookies')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="contact" />
    </div>
  );
}