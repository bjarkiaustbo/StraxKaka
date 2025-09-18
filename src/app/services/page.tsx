'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

export default function Services() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold text-yellow-500">StraxKaka</Link>
                </div>
                <div className="hidden md:flex space-x-8">
                  <LanguageContent fallback={<Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Heim</Link>}>
                    {(t) => <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.home')}</Link>}
                  </LanguageContent>
                  <LanguageContent fallback={<Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">Um okkur</Link>}>
                    {(t) => <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.about')}</Link>}
                  </LanguageContent>
                  <LanguageContent fallback={<Link href="/services" className="text-yellow-500 font-semibold">Þjónusta</Link>}>
                    {(t) => <Link href="/services" className="text-yellow-500 font-semibold">{t('nav.services')}</Link>}
                  </LanguageContent>
                  <LanguageContent fallback={<Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Hafa samband</Link>}>
                    {(t) => <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.contact')}</Link>}
                  </LanguageContent>
                  <LanguageContent fallback={<Link href="/subscription" className="text-gray-300 hover:text-yellow-400 transition-colors">Áskrift</Link>}>
                    {(t) => <Link href="/subscription" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.subscription')}</Link>}
                  </LanguageContent>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  <Link href="/contact" className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">
                    {t('nav.start_now')}
                  </Link>
                </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-black text-2xl">📅</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Afmælisdagaskráning</h3>
                  <p className="text-gray-600 mb-6">
                    Við tengjumst við HR kerfið þitt og færum allar afmælisdagaupplýsingar yfir í okkar örugga kerfi. 
                    Engin handvirk vinnubrögð þarf.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Örugg tenging við HR kerfi</li>
                    <li>• Sjálfvirk gagnafærsla</li>
                    <li>• GDPR samræmdur</li>
                    <li>• 24/7 vörn</li>
                  </ul>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('features.registration.title')}</h3>
                    <p className="text-gray-600 mb-6">
                      {t('features.registration.desc')}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• {t('services.registration.feature1')}</li>
                      <li>• {t('services.registration.feature2')}</li>
                      <li>• {t('services.registration.feature3')}</li>
                      <li>• {t('services.registration.feature4')}</li>
                    </ul>
                  </>
                )}
              </LanguageContent>
            </div>

            {/* Service 2 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-black text-2xl">🤖</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Sjálfvirkni</h3>
                  <p className="text-gray-600 mb-6">
                    Okkar AI panta kökur sjálfkrafa 3 daga fyrir afmælisdag og sendir tilkynningar til þín og starfsmannsins.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Sjálfvirk kökupöntun</li>
                    <li>• Tilkynningar fyrir afmælisdag</li>
                    <li>• Sérsniðin skilaboð</li>
                    <li>• Gæðastjórnun</li>
                  </ul>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('features.ai.title')}</h3>
                    <p className="text-gray-600 mb-6">
                      {t('services.ai.desc')}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• {t('services.ai.feature1')}</li>
                      <li>• {t('services.ai.feature2')}</li>
                      <li>• {t('services.ai.feature3')}</li>
                      <li>• {t('services.ai.feature4')}</li>
                    </ul>
                  </>
                )}
              </LanguageContent>
            </div>

            {/* Service 3 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-black text-2xl">🎂</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Kökur & Afhending</h3>
                  <p className="text-gray-600 mb-6">
                    Við vinnum með bestu kökubúðunum á Íslandi og sjáum um afhendingu á vinnustaðinn á réttum tíma.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Vinnsla með bestu kökubúðum</li>
                    <li>• Áreiðanleg afhending</li>
                    <li>• Margir valkostir</li>
                    <li>• Gæðavottun</li>
                  </ul>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('features.delivery.title')}</h3>
                    <p className="text-gray-600 mb-6">
                      {t('services.delivery.desc')}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• {t('services.delivery.feature1')}</li>
                      <li>• {t('services.delivery.feature2')}</li>
                      <li>• {t('services.delivery.feature3')}</li>
                      <li>• {t('services.delivery.feature4')}</li>
                    </ul>
                  </>
                )}
              </LanguageContent>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            {t('services.cta.subtitle')}
          </p>
          <a href="/contact" className="bg-black text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
            Hafa samband
          </a>
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
  );
}
