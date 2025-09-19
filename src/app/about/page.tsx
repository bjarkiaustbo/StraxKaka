'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation currentPage="about" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('about.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.intro.title')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.intro.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.solution.title')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.solution.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Straxkaka Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.why.title')}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('about.why.no_forgotten.title')}</h3>
              <p className="text-gray-600">{t('about.why.no_forgotten.desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('about.why.zero_hassle.title')}</h3>
              <p className="text-gray-600">{t('about.why.zero_hassle.desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('about.why.culture.title')}</h3>
              <p className="text-gray-600">{t('about.why.culture.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.promise.title')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.promise.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* The Future Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.future.title')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.future.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.team.title')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.team.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{t('about.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/subscription" 
              className="bg-yellow-500 text-black px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors font-semibold"
            >
              {t('about.cta.subscribe')}
            </Link>
            <Link 
              href="/contact" 
              className="border border-yellow-500 text-yellow-500 px-8 py-3 rounded-full hover:bg-yellow-500 hover:text-black transition-colors font-semibold"
            >
              {t('about.cta.contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">StraxKaka</h3>
              <p className="text-gray-300 mb-4">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a href={`tel:${t('common.phone')}`} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  {t('common.phone')}
                </a>
                <a href={`mailto:${t('common.email')}`} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  {t('common.email')}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t('footer.services.title')}</h4>
              <ul className="space-y-2">
                <li><a href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.services.birthday')}</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.services.ai')}</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.services.ordering')}</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.services.delivery')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t('footer.legal.title')}</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.legal.privacy')}</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.legal.terms')}</a></li>
                <li><a href="/cookies" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.legal.cookies')}</a></li>
                <li><a href="/legal" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('footer.legal.legal')}</a></li>
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