'use client';

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ClientOnly from "@/components/ClientOnly";
import LanguageContent from "@/components/LanguageContent";

export default function Home() {
  const { t, isHydrated } = useLanguage();
  
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StraxKaka",
    "description": "AI sjálfvirkni fyrirtæki sem panta kökur fyrir starfsmenn fyrirtækja svo enginn gleymi afmælisdögum",
    "url": "https://www.straxkaka.is",
    "logo": "https://www.straxkaka.is/logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+354-790-4777",
      "contactType": "customer service",
      "email": "orders.straxkaka@outlook.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IS"
    },
    "sameAs": [
      "https://www.straxkaka.is"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navigation */}
        <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
        <Image
                src="/logo.svg"
                alt="StraxKaka Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <LanguageContent fallback={<a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">Um okkur</a>}>
                {(t) => <a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.about')}</a>}
              </LanguageContent>
              <LanguageContent fallback={<a href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">Þjónusta</a>}>
                {(t) => <a href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.services')}</a>}
              </LanguageContent>
              <LanguageContent fallback={<a href="#how-it-works" className="text-gray-300 hover:text-yellow-400 transition-colors scroll-smooth">Hvernig virkar þetta?</a>}>
                {(t) => <a href="#how-it-works" className="text-gray-300 hover:text-yellow-400 transition-colors scroll-smooth">{t('home.how_it_works.title')}</a>}
              </LanguageContent>
              <LanguageContent fallback={<a href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Hafa samband</a>}>
                {(t) => <a href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.contact')}</a>}
              </LanguageContent>
              <LanguageContent fallback={<a href="/subscription" className="text-gray-300 hover:text-yellow-400 transition-colors">Áskrift</a>}>
                {(t) => <a href="/subscription" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.subscription')}</a>}
              </LanguageContent>
            </div>
            
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  <LanguageContent fallback={<a href="/contact" className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">Byrja núna</a>}>
                    {(t) => <a href="/contact" className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">
                      {t('nav.start_now')}
                    </a>}
                  </LanguageContent>

                </div>
          </div>
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <LanguageContent fallback={
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                  Aldrei gleyma afmælisdögum starfsmanna
                </h1>
                <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                  AI sjálfvirkni sem panta kökur fyrir starfsmenn fyrirtækja svo enginn gleymi afmælisdögum. StraxKaka sér um allt - frá skráningu til afhendingar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors text-center">
                    Byrja núna
                  </a>
                  <a href="/services" className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-50 transition-colors text-center">
                    Þjónusta
                  </a>
                </div>
              </>
            }>
              {(t) => (
                <>
                  <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                    {t('home.hero.title')}
                  </h1>
                  <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                    {t('home.hero.subtitle')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/contact" className="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors text-center">
                      {t('nav.start_now')}
                    </a>
                    <a href="/services" className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-50 transition-colors text-center">
                      {t('nav.services')}
                    </a>
                  </div>
                </>
              )}
            </LanguageContent>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <LanguageContent fallback={
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Hvað gerir StraxKaka?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Við sjálfvirkum ferlið fyrir afmæliskökur fyrir fyrirtækið þitt
                </p>
              </>
            }>
              {(t) => (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t('home.features.title')}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {t('home.features.subtitle')}
                  </p>
                </>
              )}
            </LanguageContent>
          </div>
          
          <LanguageContent fallback={
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Afmælisdagaskráning</h3>
                <p className="text-gray-600">
                  Við tengjumst við HR kerfið þitt og færum allar afmælisdagaupplýsingar yfir í okkar örugga kerfi.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Sjálfvirkni</h3>
                <p className="text-gray-600">
                  Gervigreind okkar sér um að panta rétta köku fyrir réttan starfsmann á réttum tíma.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎂</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Afhending</h3>
                <p className="text-gray-600">
                  Kökurnar eru afhentar beint á vinnustaðinn á afmælisdaginn.
                </p>
              </div>
            </div>
          }>
            {(t) => (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.registration.title')}</h3>
                  <p className="text-gray-600">
                    {t('features.registration.desc')}
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.ai.title')}</h3>
                  <p className="text-gray-600">
                    {t('features.ai.desc')}
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎂</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.delivery.title')}</h3>
                  <p className="text-gray-600">
                    {t('features.delivery.desc')}
                  </p>
                </div>
              </div>
            )}
          </LanguageContent>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <LanguageContent fallback={
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Hvernig virkar þetta?
                </h2>
                <p className="text-xl text-gray-600">
                  Einfalt ferli í 3 skrefum
                </p>
              </>
            }>
              {(t) => (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t('home.how_it_works.title')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {t('home.how_it_works.subtitle')}
                  </p>
                </>
              )}
            </LanguageContent>
          </div>
          
          <LanguageContent fallback={
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Tengja HR kerfi</h3>
                <p className="text-gray-600">
                  Við tengjumst við HR kerfið þitt og færum afmælisdagaupplýsingar yfir.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI panta kökur</h3>
                <p className="text-gray-600">
                  Gervigreind okkar panta kökur sjálfkrafa fyrir afmælisdaga.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Afhending</h3>
                <p className="text-gray-600">
                  Kökurnar eru afhentar á vinnustaðinn á afmælisdaginn.
                </p>
              </div>
            </div>
          }>
            {(t) => (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('how_it_works.step1.title')}</h3>
                  <p className="text-gray-600">
                    {t('how_it_works.step1.desc')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('how_it_works.step2.title')}</h3>
                  <p className="text-gray-600">
                    {t('how_it_works.step2.desc')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('how_it_works.step3.title')}</h3>
                  <p className="text-gray-600">
                    {t('how_it_works.step3.desc')}
                  </p>
                </div>
              </div>
            )}
          </LanguageContent>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <LanguageContent fallback={
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Tilbúinn að byrja?
              </h2>
              <p className="text-xl text-gray-800 mb-8">
                Hafðu samband við okkur í dag og fáðu ókeypis samráðstefnu um hvernig StraxKaka getur hjálpað fyrirtækinu þínu.
              </p>
              <a href="/contact" className="bg-black text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                Hafa samband
              </a>
            </>
          }>
            {(t) => (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  {t('home.cta.title')}
                </h2>
                <p className="text-xl text-gray-800 mb-8">
                  {t('home.cta.subtitle')}
                </p>
                <a href="/contact" className="bg-black text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                  {t('nav.contact')}
                </a>
              </>
            )}
          </LanguageContent>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
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
                <li>{t('footer.company.blog')}</li>
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
            <p>&copy; 2024 StraxKaka. {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
