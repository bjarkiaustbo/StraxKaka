'use client';

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ClientOnly from "@/components/ClientOnly";
import LanguageContent from "@/components/LanguageContent";
import Navigation from "@/components/Navigation";

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
        <Navigation currentPage="home" />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/logo.svg" 
                alt="StraxKaka Logo" 
                className="h-16 w-auto"
              />
            </div>
            
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

      {/* Why StraxKaka Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <LanguageContent fallback={
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Af hverju StraxKaka?
                </h2>
                <p className="text-xl text-gray-600">
                  Lausn fyrir vandamálið sem allir þekkja
                </p>
              </>
            }>
              {(t) => (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t('home.why.title')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {t('home.why.subtitle')}
                  </p>
                </>
              )}
            </LanguageContent>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <LanguageContent fallback="Áhyggjulaus starfsmannadeild">
                  {(t) => t('home.why.stress_free.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Engin gleymdir afmæli">
                  {(t) => t('home.why.stress_free.desc')}
                </LanguageContent>
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <LanguageContent fallback="Byggir upp stemningu og vinnustofukúltúr">
                  {(t) => t('home.why.morale.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Fersk kaka á afmælisdaginn">
                  {(t) => t('home.why.morale.desc')}
                </LanguageContent>
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <LanguageContent fallback="Áreiðanleg afhending frá staðbundnum bakaríum">
                  {(t) => t('home.why.reliable.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Toppstig kökur á réttum tíma">
                  {(t) => t('home.why.reliable.desc')}
                </LanguageContent>
              </p>
            </div>
          </div>
          
          {/* Bottom row with 2 centered icons */}
          <div className="flex justify-center mt-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              <div className="text-center p-6">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <LanguageContent fallback="Sparar tíma og vinnu">
                    {(t) => t('home.why.time_saving.title')}
                  </LanguageContent>
                </h3>
                <p className="text-gray-600">
                  <LanguageContent fallback="Við sjáum um allt ferlið">
                    {(t) => t('home.why.time_saving.desc')}
                  </LanguageContent>
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <LanguageContent fallback="Gæðavottun og sérsniðin þjónusta">
                    {(t) => t('home.why.quality.title')}
                  </LanguageContent>
                </h3>
                <p className="text-gray-600">
                  <LanguageContent fallback="Hvert fyrirtæki fær einstaka þjónustu">
                    {(t) => t('home.why.quality.desc')}
                  </LanguageContent>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Article Tease Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Birthday cake celebration" 
                  className="w-48 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Mikilvægi afmælisfagnaðar á vinnustaðnum">
                    {(t) => t('blog.article.title')}
                  </LanguageContent>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  <LanguageContent fallback="Kynntu þér hvernig afmælisfagnaður getur bætt stemningu, aukið hamingju og sparað tíma fyrir HR deildina.">
                    {(t) => t('blog.article.excerpt')}
                  </LanguageContent>
                </p>
                <a 
                  href="/blog/workplace-celebrations" 
                  className="inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                >
                  <LanguageContent fallback="Lesa grein">
                    {(t) => t('blog.article.read_more')}
                  </LanguageContent>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tease Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LanguageContent fallback={
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Einfalt verð fyrir alla stærðir fyrirtækja
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Greiðist fyrir hvern afmælisdag
              </p>
              <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lítill</h3>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">Sérsniðið</div>
                  <p className="text-sm text-gray-600 mb-2">Fyrir 50 starfsmenn</p>
                  <p className="text-xs text-gray-500">Greiðist fyrir hvern afmælisdag</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Meðalstór</h3>
                  <div className="text-2xl font-bold text-amber-600 mb-2">60.000 ISK</div>
                  <p className="text-sm text-gray-600 mb-2">50+ starfsmenn</p>
                  <p className="text-xs text-gray-500">Greiðist fyrir hvern afmælisdag (~12.600 ISK)</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-2 border-yellow-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Stór</h3>
                  <div className="text-2xl font-bold text-orange-600 mb-2">120.000 ISK</div>
                  <p className="text-sm text-gray-600 mb-2">100+ starfsmenn</p>
                  <p className="text-xs text-gray-500">Greiðist fyrir hvern afmælisdag</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Fyrirtæki</h3>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">Sérsniðið</div>
                  <p className="text-sm text-gray-600 mb-2">200+ starfsmenn</p>
                  <p className="text-xs text-gray-500">Greiðist fyrir hvern afmælisdag (~12.600 ISK)</p>
                </div>
              </div>
            </>
          }>
            {(t) => (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('pricing.title')}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {t('pricing.subtitle')}
                </p>
                <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('pricing.small.title')}
                    </h3>
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      {t('pricing.small.price')}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {t('pricing.small.description')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('pricing.small.billing')}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('pricing.starter.title')}
                    </h3>
                    <div className="text-2xl font-bold text-amber-600 mb-2">
                      {t('pricing.starter.price')}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {t('pricing.starter.description')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('pricing.starter.billing')}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md border-2 border-yellow-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('pricing.professional.title')}
                    </h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {t('pricing.professional.price')}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {t('pricing.professional.description')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('pricing.professional.billing')}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('pricing.business.title')}
                    </h3>
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      {t('pricing.business.price')}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {t('pricing.business.description')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('pricing.business.billing')}
                    </p>
                  </div>
                </div>
              </>
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
                Tilbúin/n að byrja?
              </h2>
              <p className="text-xl text-gray-800 mb-8">
                Tilbúin/n að gera afmælisdaga áhyggjulausa? Byrjaðu áskriftina þína í dag.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/subscription" className="bg-black text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                  Subscribe
                </a>
                <a href="/contact" className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                  Hafa samband
                </a>
              </div>
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/subscription" className="bg-black text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                    Subscribe
                  </a>
                  <a href="/contact" className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                    {t('nav.contact')}
                  </a>
                </div>
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
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
