'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageContent from '@/components/LanguageContent';
import Navigation from '@/components/Navigation';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function Home() {

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


      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="Article in english, Grein">
                {(t) => t('blog.section.title')}
              </LanguageContent>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <LanguageContent fallback="Hvernig fögnuður innan vinnustaðs getur breytt stemninguni">
                {(t) => t('blog.section.subtitle')}
              </LanguageContent>
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Image 
                src="/article-cake.jpeg" 
                alt="Beautiful birthday cake with candles" 
                width={1200}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Sætt leyndarmál að hamingjusamari vinnustað: Aldrei gleyma afmælum aftur">
                    {(t) => t('blog.article.title')}
                  </LanguageContent>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  <LanguageContent fallback="Vinnustaðir eru meira en skrifstofur þar sem verkefni eru unnin – þeir eru samfélög þar sem fólk eyðir stórum hluta lífs síns. Í þessum rýmum skiptir máli að fólk líði vel, finni sig metið og upplifi þakklæti. Ein af einföldustu en áhrifaríkustu leiðunum til að skapa þessa menningu? Að fagna afmælum.">
                    {(t) => t('blog.article.excerpt')}
                  </LanguageContent>
                </p>
                <Link 
                  href="/blog/workplace-celebrations"
                  className="inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  <LanguageContent fallback="Lesa grein">
                    {(t) => t('blog.article.read_more')}
                  </LanguageContent>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <LanguageContent fallback="Einfalt verð">
                {(t) => t('pricing.simple.title')}
              </LanguageContent>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <LanguageContent fallback="Veldu réttan áætlun fyrir stærð fyrirtækisins þíns">
                {(t) => t('pricing.simple.subtitle')}
              </LanguageContent>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Little Company */}
            <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl p-8 text-black relative">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  <LanguageContent fallback="Lítil fyrirtæki">
                    {(t) => t('pricing.little.title')}
                  </LanguageContent>
                </h3>
                <div className="text-4xl font-bold mb-2">
                  <LanguageContent fallback="15.000 ISK">
                    {(t) => t('pricing.little.price')}
                  </LanguageContent>
                </div>
                <div className="text-lg mb-6">
                  <LanguageContent fallback="á mánuði + kökugjöld">
                    {(t) => t('pricing.little.billing')}
                  </LanguageContent>
                </div>
                <div className="text-sm mb-8">
                  <LanguageContent fallback="Hentar fyrir 1-25 starfsmenn">
                    {(t) => t('pricing.little.description')}
                  </LanguageContent>
                </div>
                <Link 
                  href="/subscription"
                  className="w-full bg-black text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors inline-block"
                >
                  <LanguageContent fallback="Byrja núna">
                    {(t) => t('nav.start_now')}
                  </LanguageContent>
                </Link>
              </div>
            </div>

            {/* Medium Company */}
            <div className="bg-gray-800 rounded-2xl p-8 text-white relative border-2 border-yellow-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                  <LanguageContent fallback="Mælt með">
                    {(t) => t('pricing.recommended')}
                  </LanguageContent>
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  <LanguageContent fallback="Meðalstór fyrirtæki">
                    {(t) => t('pricing.medium.title')}
                  </LanguageContent>
                </h3>
                <div className="text-4xl font-bold mb-2 text-yellow-500">
                  <LanguageContent fallback="Hafa samband">
                    {(t) => t('pricing.contact')}
                  </LanguageContent>
                </div>
                <div className="text-lg mb-6">
                  <LanguageContent fallback="fyrir verð">
                    {(t) => t('pricing.for_pricing')}
                  </LanguageContent>
                </div>
                <div className="text-sm mb-8">
                  <LanguageContent fallback="Hentar fyrir 26-50 starfsmenn">
                    {(t) => t('pricing.medium.description')}
                  </LanguageContent>
                </div>
                <Link 
                  href="/contact"
                  className="w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
                >
                  <LanguageContent fallback="Hafa samband">
                    {(t) => t('nav.contact')}
                  </LanguageContent>
                </Link>
              </div>
            </div>

            {/* Large Company */}
            <div className="bg-gray-800 rounded-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  <LanguageContent fallback="Stór fyrirtæki">
                    {(t) => t('pricing.large.title')}
                  </LanguageContent>
                </h3>
                <div className="text-4xl font-bold mb-2 text-yellow-500">
                  <LanguageContent fallback="Hafa samband">
                    {(t) => t('pricing.contact')}
                  </LanguageContent>
                </div>
                <div className="text-lg mb-6">
                  <LanguageContent fallback="fyrir verð">
                    {(t) => t('pricing.for_pricing')}
                  </LanguageContent>
                </div>
                <div className="text-sm mb-8">
                  <LanguageContent fallback="Hentar fyrir 51+ starfsmenn">
                    {(t) => t('pricing.large.description')}
                  </LanguageContent>
                </div>
                <Link 
                  href="/contact"
                  className="w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
                >
                  <LanguageContent fallback="Hafa samband">
                    {(t) => t('nav.contact')}
                  </LanguageContent>
                </Link>
              </div>
            </div>
          </div>
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
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="home" />
    </div>
  );
}
