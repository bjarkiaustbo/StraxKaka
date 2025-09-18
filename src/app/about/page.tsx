'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

export default function About() {
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
                  <LanguageContent fallback={<Link href="/about" className="text-yellow-500 font-semibold">Um okkur</Link>}>
                    {(t) => <Link href="/about" className="text-yellow-500 font-semibold">{t('nav.about')}</Link>}
                  </LanguageContent>
                  <LanguageContent fallback={<Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">Þjónusta</Link>}>
                    {(t) => <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.services')}</Link>}
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
                  <LanguageContent fallback={<Link href="/contact" className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">Byrja núna</Link>}>
                    {(t) => <Link href="/contact" className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">
                      {t('nav.start_now')}
                    </Link>}
                  </LanguageContent>
                </div>
          </div>
        </div>
      </nav>

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

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.mission.title')}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.mission.desc')}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Ég byrjaði þetta verkefni árið 2024 til að hjálpa fyrirtækjum að gleyma aldrei afmælisdögum starfsmanna með AI sjálfvirkni.
              </p>
            </div>
            <div className="bg-yellow-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nýtt verkefni</h3>
              <p className="text-gray-600">Í þróun fyrir íslensk fyrirtæki</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.team.title')}</h2>
            <p className="text-xl text-gray-600">
              {t('about.team.desc')}
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Stofnandi</h3>
                  <p className="text-yellow-600 font-medium mb-2">Einn maður, mikil draumur</p>
                  <p className="text-gray-600">
                    Ég er einn maður sem byrjaði þetta verkefni árið 2024 til að hjálpa fyrirtækjum að gleyma aldrei afmælisdögum starfsmanna með AI sjálfvirkni.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('about.founder.title')}</h3>
                    <p className="text-yellow-600 font-medium mb-2">{t('about.founder.tagline')}</p>
                    <p className="text-gray-600">
                      {t('about.founder.desc')}
                    </p>
                  </>
                )}
              </LanguageContent>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.values.title')}</h2>
            <p className="text-xl text-gray-600">
              {t('about.values.desc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Samvinnu</h3>
                  <p className="text-gray-600 text-sm">
                    Við vinnum náið með fyrirtækjum og kökubúðum til að tryggja bestu þjónustuna.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.values.cooperation.title')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('about.values.cooperation.desc')}
                    </p>
                  </>
                )}
              </LanguageContent>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nýsköpun</h3>
                  <p className="text-gray-600 text-sm">
                    Við notum nýjasta tækni til að gera ferlið eins einfalt og sjálfvirkt og mögulegt er.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.values.innovation.title')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('about.values.innovation.desc')}
                    </p>
                  </>
                )}
              </LanguageContent>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Umhyggja</h3>
                  <p className="text-gray-600 text-sm">
                    Við höfum áhyggjur af því að starfsmenn fái að fagna afmælisdag sínum á vinnustaðnum.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.values.care.title')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('about.values.care.desc')}
                    </p>
                  </>
                )}
              </LanguageContent>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <LanguageContent fallback={
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Gæði</h3>
                  <p className="text-gray-600 text-sm">
                    Við tryggjum aðeins bestu gæði í öllu sem við gerum - frá kökum til þjónustu.
                  </p>
                </>
              }>
                {(t) => (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.values.quality.title')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('about.values.quality.desc')}
                    </p>
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
          <LanguageContent fallback={
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Viltu vinna með okkur?
              </h2>
              <p className="text-xl text-gray-800 mb-8">
                Hafðu samband við okkur og fáðu að vita hvernig við getum hjálpað fyrirtækinu þínu
              </p>
              <a href="/contact" className="bg-black text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                Hafa samband
              </a>
            </>
          }>
            {(t) => (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  {t('about.cta.title')}
                </h2>
                <p className="text-xl text-gray-800 mb-8">
                  {t('about.cta.subtitle')}
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
