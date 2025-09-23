'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';
import Navigation from '@/components/Navigation';
import PricingTable from '@/components/PricingTable';

export default function Home() {
  const { t } = useLanguage();
  const [employeeCount, setEmployeeCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation currentPage="home" />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <LanguageContent fallback="Munaðir afmælisdagar gleðja alla">
                {(t) => t('home.hero.title')}
              </LanguageContent>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <LanguageContent fallback="Með StraxKaka er hver afmælisdagur munaður, hver kaka komin á réttum tíma og vinnumenningin verður sætari.">
                {(t) => t('home.hero.subtitle')}
              </LanguageContent>
            </p>
            <div className="mt-8">
              <Link 
                href="/subscription"
                className="inline-flex items-center bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                <LanguageContent fallback="Byrja núna">
                  {(t) => t('nav.start_now')}
                </LanguageContent>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="Hvað vinnur StraxKaka fyrir þig?">
                {(t) => t('home.features.title')}
              </LanguageContent>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <LanguageContent fallback="Við leysum vandamálið sem allir þekkja: gleymdir afmælisdagum sem skaða samstöðu og stemningu">
                {(t) => t('home.features.subtitle')}
              </LanguageContent>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <LanguageContent fallback="Skráning í öruggu kerfi">
                  {(t) => t('features.registration.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Hlaða inn Excel skrá eða tengja við HR kerfið. Engin flókin uppsetning, bara skrá og gleyma.">
                  {(t) => t('features.registration.desc')}
                </LanguageContent>
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <LanguageContent fallback="Kerfið panta kökur fyrir þig">
                  {(t) => t('features.ai.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Kökurnar koma með engum áhyggjum á sérstakan daginn, með tilkynningum og öllu.">
                  {(t) => t('features.ai.desc')}
                </LanguageContent>
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <LanguageContent fallback="Við vinnum með frábærum bakaríum">
                  {(t) => t('features.delivery.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Sem bjóða upp á toppstig kökur og tryggja afhendingu á réttum tíma, með fjölbreytilegum valkostum.">
                  {(t) => t('features.delivery.desc')}
                </LanguageContent>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="Svo einfalt er þetta">
                {(t) => t('home.how_it_works.title')}
              </LanguageContent>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <LanguageContent fallback="Þú skráir, við sérum um allt annað">
                {(t) => t('home.how_it_works.subtitle')}
              </LanguageContent>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <LanguageContent fallback="Skrá starfsmenn">
                  {(t) => t('how_it_works.step1.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Hlaða inn nöfn og afmælisdaga starfsmanna. Einn skjall og þú ert komin/n.">
                  {(t) => t('how_it_works.step1.desc')}
                </LanguageContent>
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <LanguageContent fallback="Við muna fyrir þig">
                  {(t) => t('how_it_works.step2.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Kerfið muna allt og panta kökur sjálfkrafa. Engin að gleyma neitt.">
                  {(t) => t('how_it_works.step2.desc')}
                </LanguageContent>
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <LanguageContent fallback="Kökurnar birtast">
                  {(t) => t('how_it_works.step3.title')}
                </LanguageContent>
              </h3>
              <p className="text-gray-600">
                <LanguageContent fallback="Á afmælisdaginn birtast kökurnar á vinnustaðnum. Starfsmenn fagna og stemningin batnar.">
                  {(t) => t('how_it_works.step3.desc')}
                </LanguageContent>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why StraxKaka Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="Af hverju StraxKaka?">
                {(t) => t('home.why.title')}
              </LanguageContent>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <LanguageContent fallback="Lausn fyrir vandamálið sem allir þekkja">
                {(t) => t('home.why.subtitle')}
              </LanguageContent>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
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

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTable employeeCount={employeeCount} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            <LanguageContent fallback="Tilbúin/n að byrja?">
              {(t) => t('home.cta.title')}
            </LanguageContent>
          </h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            <LanguageContent fallback="Tilbúin/n að gera afmælisdaga áhyggjulausa? Byrjaðu áskriftina þína í dag.">
              {(t) => t('home.cta.subtitle')}
            </LanguageContent>
          </p>
          <Link 
            href="/subscription"
            className="inline-flex items-center bg-black text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            <LanguageContent fallback="Byrja núna">
              {(t) => t('nav.start_now')}
            </LanguageContent>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-500">StraxKaka</h3>
              <p className="text-gray-400">
                <LanguageContent fallback="Lausn fyrir gleymdir afmælisdaga. Við muna fyrir þig.">
                  {(t) => t('footer.description')}
                </LanguageContent>
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">
                <LanguageContent fallback="Þjónusta">
                  {(t) => t('footer.services.title')}
                </LanguageContent>
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <LanguageContent fallback="Afmælisdagaskráning">
                    {(t) => t('footer.services.birthday')}
                  </LanguageContent>
                </li>
                <li>
                  <LanguageContent fallback="AI sjálfvirkni">
                    {(t) => t('footer.services.ai')}
                  </LanguageContent>
                </li>
                <li>
                  <LanguageContent fallback="Kökupöntun">
                    {(t) => t('footer.services.ordering')}
                  </LanguageContent>
                </li>
                <li>
                  <LanguageContent fallback="Afhending">
                    {(t) => t('footer.services.delivery')}
                  </LanguageContent>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">
                <LanguageContent fallback="Fyrirtæki">
                  {(t) => t('footer.company.title')}
                </LanguageContent>
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-yellow-500 transition-colors">
                    <LanguageContent fallback="Um okkur">
                      {(t) => t('nav.about')}
                    </LanguageContent>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-yellow-500 transition-colors">
                    <LanguageContent fallback="Hafa samband">
                      {(t) => t('nav.contact')}
                    </LanguageContent>
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-yellow-500 transition-colors">
                    <LanguageContent fallback="Blogg">
                      {(t) => t('blog.title')}
                    </LanguageContent>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">
                <LanguageContent fallback="Löglegar síður">
                  {(t) => t('footer.legal.title')}
                </LanguageContent>
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/privacy" className="hover:text-yellow-500 transition-colors">
                    <LanguageContent fallback="Persónuverndarstefna">
                      {(t) => t('footer.legal.privacy')}
                    </LanguageContent>
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-yellow-500 transition-colors">
                    <LanguageContent fallback="Skilmálar">
                      {(t) => t('footer.legal.terms')}
                    </LanguageContent>
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="hover:text-yellow-500 transition-colors">
                    <LanguageContent fallback="Vafrakökur">
                      {(t) => t('footer.legal.cookies')}
                    </LanguageContent>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">
                <LanguageContent fallback="Hafa samband">
                  {(t) => t('footer.contact.title')}
                </LanguageContent>
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <LanguageContent fallback="orders.straxkaka@outlook.com">
                    {(t) => t('common.email')}
                  </LanguageContent>
                </li>
                <li>
                  <LanguageContent fallback="+354-790-4777">
                    {(t) => t('common.phone')}
                  </LanguageContent>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              <LanguageContent fallback="© 2025 StraxKaka. Allur réttur áskilinn. Byrjaði árið 2025.">
                {(t) => t('footer.copyright')}
              </LanguageContent>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
