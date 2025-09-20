'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';
import Navigation from '@/components/Navigation';

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
      title: 'Email Support',
      description: 'Send us an email for general inquiries, support, or business questions',
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      contact: 'orders.straxkaka@outlook.com',
      action: 'mailto:orders.straxkaka@outlook.com',
      color: 'yellow'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call us for immediate assistance or urgent matters',
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      contact: '+354 790 4777',
      action: 'tel:+3547904777',
      color: 'amber'
    },
    {
      id: 'support',
      title: 'Business Hours',
      description: 'Monday - Friday: 9:00 AM - 5:00 PM (GMT)',
      icon: (
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      contact: '9:00 AM - 5:00 PM GMT',
      action: null,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation currentPage="contact" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/logo.svg" 
              alt="StraxKaka Logo" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('contact.info.title')}
            </h2>
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
                  {method.title}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
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
                      {method.id === 'email' ? 'Send Email' : method.id === 'phone' ? 'Call Now' : 'View Hours'}
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

      {/* Quick Help Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Help & Support
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions and get help quickly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Getting Started */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-gray-600 text-sm mb-4">Learn how to set up your subscription and add employees</p>
              <a href="/subscription" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Start Subscription →
              </a>
            </div>

            {/* Pricing Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing Plans</h3>
              <p className="text-gray-600 text-sm mb-4">View our flexible pricing options for different company sizes</p>
              <a href="/services" className="text-green-600 hover:text-green-700 font-medium text-sm">
                View Pricing →
              </a>
            </div>

            {/* Technical Support */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Support</h3>
              <p className="text-gray-600 text-sm mb-4">Need help with technical issues or integrations?</p>
              <a href="mailto:orders.straxkaka@outlook.com" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Contact Support →
              </a>
            </div>

            {/* Business Inquiries */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Inquiries</h3>
              <p className="text-gray-600 text-sm mb-4">Partnerships, enterprise solutions, or custom requests</p>
              <a href="mailto:orders.straxkaka@outlook.com" className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                Business Contact →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about StraxKaka
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How does StraxKaka work?</h3>
              <p className="text-gray-600">Simply upload your employee list with birthdays, and we&apos;ll automatically order cakes from local bakeries on the right dates. No more forgotten birthdays!</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What bakeries do you work with?</h3>
              <p className="text-gray-600">We partner with the best local bakeries in Iceland to ensure fresh, delicious cakes delivered directly to your workplace.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I customize cake preferences?</h3>
              <p className="text-gray-600">Yes! You can specify dietary restrictions, cake types, and celebration preferences for each employee in your system.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost?</h3>
              <p className="text-gray-600">Pricing starts at 60,000 ISK for medium companies (50+ employees) and scales based on your company size. Each cake costs approximately 12,600 ISK.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What if an employee leaves?</h3>
              <p className="text-gray-600">You can easily remove employees from the system, and we&apos;ll stop ordering cakes for them immediately. No long-term commitments!</p>
            </div>
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
                <li><a href="/legal" className="hover:text-yellow-400">{t('footer.legal.legal')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}