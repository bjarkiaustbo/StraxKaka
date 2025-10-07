'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageContent from '@/components/LanguageContent';
import Navigation from '@/components/Navigation';
import MobileBottomNav from '@/components/MobileBottomNav';
import { useState } from 'react';
import Image from 'next/image';

export default function Services() {
  const { t, language } = useLanguage();
  const [currentCakeIndex, setCurrentCakeIndex] = useState(0);

  const cakes = [
    {
      id: 'rose_light',
      nameIcelandic: 'Rósakaka ljóst sukkulaði',
      nameEnglish: 'Rose Cake Light Chocolate',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Mjólkurvörur, hveiti, egg',
      allergensEnglish: 'Dairy products, wheat, eggs'
    },
    {
      id: 'rose_dark',
      nameIcelandic: 'Rósakaka dökkt súkkulaði',
      nameEnglish: 'Rose Cake Dark Chocolate',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Mjólkurvörur, hveiti, egg',
      allergensEnglish: 'Dairy products, wheat, eggs'
    },
    {
      id: 'skuffu',
      nameIcelandic: 'Skúffukaka á bakka',
      nameEnglish: 'Skúffukaka on Tray',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Mjólkurvörur, hveiti, egg',
      allergensEnglish: 'Dairy products, wheat, eggs'
    },
    {
      id: 'strawberry',
      nameIcelandic: 'Jarðaberja',
      nameEnglish: 'Strawberry',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Súrmjólk (mjólk, mjólkursýrugerlar), egg, hveiti, hveitisterkja, mjólkursykur, undanrennuduft',
      allergensEnglish: 'Sour milk (milk, lactic acid bacteria), eggs, wheat, wheat starch, milk sugar, skimmed milk powder'
    },
    {
      id: 'lemon_cheese',
      nameIcelandic: 'Sitronuost',
      nameEnglish: 'Lemon Cheese',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Mjólkurvörur, hveiti, hafrar, egg',
      allergensEnglish: 'Dairy products, wheat, oats, eggs'
    },
    {
      id: 'biscoff',
      nameIcelandic: 'Biscoff',
      nameEnglish: 'Biscoff',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'EGG, MJÓLKURAFURÐIR, GLÚTEIN, SOYA',
      allergensEnglish: 'EGGS, DAIRY PRODUCTS, GLUTEN, SOY'
    },
    {
      id: 'daim',
      nameIcelandic: 'Daim',
      nameEnglish: 'Daim',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Súrmjólk (mjólk, mjólkursýrugerlar), undanrennuduft, egg, rjómi, dökkt súkkulaði, hveiti, mjólkursykur, hveitisterkja, smjör, mjólkurduft',
      allergensEnglish: 'Sour milk (milk, lactic acid bacteria), skimmed milk powder, eggs, cream, dark chocolate, wheat, milk sugar, wheat starch, butter, milk powder'
    },
    {
      id: 'tiramisu',
      nameIcelandic: 'Tiramisu',
      nameEnglish: 'Tiramisu',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'GLÚTEN, MJÓLK, EGG',
      allergensEnglish: 'GLUTEN, MILK, EGGS'
    },
    {
      id: 'chocolate_caramel',
      nameIcelandic: 'Súkkulaði með karamellukremi',
      nameEnglish: 'Chocolate with Caramel Cream',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Karamellu glassúr, egg, hveiti, suðusúkkulaði, mysuduft, hveitiglúten',
      allergensEnglish: 'Caramel glaze, eggs, wheat, boiled chocolate, whey powder, wheat gluten'
    },
    {
      id: 'chocolate_cream',
      nameIcelandic: 'Súkkulaði með súkkulaðikremi',
      nameEnglish: 'Chocolate with Chocolate Cream',
      price: 15000,
      image: '/cake-placeholder.jpg',
      dietary: 'Contains dairy, eggs, gluten',
      allergensIcelandic: 'Súkkulaðiglassúr, egg, hveiti, suðusúkkulaði, mysuduft, hveitiglúten',
      allergensEnglish: 'Chocolate glaze, eggs, wheat, boiled chocolate, whey powder, wheat gluten'
    }
  ];

  const nextCake = () => {
    setCurrentCakeIndex((prev) => (prev + 1) % cakes.length);
  };

  const prevCake = () => {
    setCurrentCakeIndex((prev) => (prev - 1 + cakes.length) % cakes.length);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 md:pb-0">
      <Navigation currentPage="services" />

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
          
          <LanguageContent fallback={
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Þjónusta okkar
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Allt sem þú þarft til að aldrei gleyma afmælisdögum starfsmanna
              </p>
            </>
          }>
            {(t) => (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {t('services.hero.title')}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {t('services.hero.subtitle')}
                </p>
              </>
            )}
          </LanguageContent>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <LanguageContent fallback={
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Þjónustan okkar
                </h2>
              </>
            }>
              {(t) => (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t('services.detailed.title')}
                  </h2>
                </>
              )}
            </LanguageContent>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Skráning fer í gegnum öruggt kerfi</h3>
                  <p className="text-gray-600">
                    Hlaða inn Excel skrá eða tengja við HR kerfið. Engin flókin uppsetning, bara skrá og gleyma.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.registration.title')}</h3>
                    <p className="text-gray-600">
                      {t('features.registration.desc')}
                    </p>
                  </>
                )}
              </LanguageContent>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Við pöntum kökur fyrir þig</h3>
                  <p className="text-gray-600">
                    Við vinnum í samstarfi við frábær bakarí, og bjóðum upp á gómsætar og fjölbreyttar kökur.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.ai.title')}</h3>
                    <p className="text-gray-600">
                      {t('features.ai.desc')}
                    </p>
                  </>
                )}
              </LanguageContent>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Kökur koma á réttum degi</h3>
                  <p className="text-gray-600">
                    Afhending á sér stað á réttum tíma og degi, til þess að tryggja að kakan sé kominn í hadeginu.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t('features.delivery.title')}</h3>
                    <p className="text-gray-600">
                      {t('features.delivery.desc')}
                    </p>
                  </>
                )}
              </LanguageContent>
            </div>
          </div>
        </div>
      </section>

      {/* Cake Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <LanguageContent fallback={
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Kökur sem við bjóðum upp á
                </h2>
                <p className="text-xl text-gray-600">
                  Flestir kökur eru af sömu stærð - fullkominn fyrir afmælisdaga
                </p>
              </>
            }>
              {(t) => (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t('services.cakes.title')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {t('services.cakes.subtitle')}
                  </p>
                </>
              )}
            </LanguageContent>
          </div>

          {/* Cake Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative h-80 sm:h-96 md:h-[500px] touch-pan-y">
                <Image
                  src={cakes[currentCakeIndex].image}
                  alt={language === 'is' ? cakes[currentCakeIndex].nameIcelandic : cakes[currentCakeIndex].nameEnglish}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevCake}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 active:bg-opacity-100 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10 touch-manipulation"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextCake}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 active:bg-opacity-100 text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10 touch-manipulation"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Cake Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6 md:p-8">
                  <div className="text-white">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 leading-tight">
                      {language === 'is' ? cakes[currentCakeIndex].nameIcelandic : cakes[currentCakeIndex].nameEnglish}
                    </h3>
                    <p className="text-lg sm:text-xl text-gray-200 mb-2 sm:mb-4">
                      {cakes[currentCakeIndex].price.toLocaleString()} ISK
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">
                      <LanguageContent fallback="Afhending innifalin">
                        {(t) => t('services.cakes.delivery_included')}
                      </LanguageContent>
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block mb-2">
                      <LanguageContent fallback="Ofnæmisvaldar:">
                        {(t) => t('services.cakes.allergens')}
                      </LanguageContent>
                      {language === 'is' ? cakes[currentCakeIndex].allergensIcelandic : cakes[currentCakeIndex].allergensEnglish}
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block">
                      {cakes[currentCakeIndex].dietary}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
              {cakes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCakeIndex(index)}
                  className={`w-3 h-3 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation flex-shrink-0 ${
                    index === currentCakeIndex 
                      ? 'bg-yellow-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Cake Counter */}
            <div className="text-center mt-4">
              <p className="text-sm sm:text-base text-gray-600">
                {currentCakeIndex + 1} / {cakes.length} 
                <LanguageContent fallback=" kökur">
                  {(t) => ' ' + t('services.cakes.cakes')}
                </LanguageContent>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Same as Home Page */}
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
                  <LanguageContent fallback="14.750 ISK">
                    {(t) => t('pricing.starter.price')}
                  </LanguageContent>
                </div>
                <div className="text-lg mb-6">
                  <LanguageContent fallback="fyrir hverja afmælisköku">
                    {(t) => t('pricing.starter.billing')}
                  </LanguageContent>
                </div>
                <div className="text-sm mb-8">
                  <LanguageContent fallback="Hentar fyrir vaxandi fyrirtæki">
                    {(t) => t('pricing.starter.description')}
                  </LanguageContent>
                </div>
                <Link 
                  href="/subscription"
                  className="w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
                >
                  <LanguageContent fallback="Byrja núna">
                    {(t) => t('nav.start_now')}
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
                  <LanguageContent fallback="14.500 ISK">
                    {(t) => t('pricing.professional.price')}
                  </LanguageContent>
                </div>
                <div className="text-lg mb-6">
                  <LanguageContent fallback="fyrir hverja afmælisköku">
                    {(t) => t('pricing.professional.billing')}
                  </LanguageContent>
                </div>
                <div className="text-sm mb-8">
                  <LanguageContent fallback="Hentar fyrir stofnuð fyrirtæki">
                    {(t) => t('pricing.professional.description')}
                  </LanguageContent>
                </div>
                <Link 
                  href="/subscription"
                  className="w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
                >
                  <LanguageContent fallback="Byrja núna">
                    {(t) => t('nav.start_now')}
                  </LanguageContent>
                </Link>
              </div>
            </div>
          </div>
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
      <MobileBottomNav currentPage="services" />
    </div>
  );
}
