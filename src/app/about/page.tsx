'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import LanguageContent from '@/components/LanguageContent';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation currentPage="about" />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <LanguageContent fallback="Um okkur">
                {(t) => t('about.hero.title')}
              </LanguageContent>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <LanguageContent fallback="Lausn fyrir vandamálið sem allir þekkja: gleymdir afmælisdagum">
                {(t) => t('about.hero.subtitle')}
              </LanguageContent>
            </p>
          </div>
        </div>
      </section>


      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              <LanguageContent fallback="Vandamálið">
                {(t) => t('about.intro.title')}
              </LanguageContent>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <LanguageContent fallback="Í starfsmannadeildinni er nóg að gera – það þarf að muna afmælisdagsetningar, panta köku, sækja hana og bera fram. þetta getur verið auka stress eða þá gleymist þetta stundum. Það sem átti að vera gleðistund verður stress, og gleymdur afmælisdagur getur jafnvel skemmd vinnumorale.">
                {(t) => t('about.intro.desc')}
              </LanguageContent>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              <LanguageContent fallback="Straxkaka er lausnin">
                {(t) => t('about.solution.title')}
              </LanguageContent>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <LanguageContent fallback="Við sjáum um allt ferlið – þú þarft ekki að lifta fingur. Enginn gleymir lengur, og fersk kaka birtist á vinnustaðnum á afmælisdaginn.">
                {(t) => t('about.solution.desc')}
              </LanguageContent>
            </p>
          </div>
        </div>
      </section>

      {/* Why StraxKaka Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="Af hverju Straxkaka?">
                {(t) => t('about.why.title')}
              </LanguageContent>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                <LanguageContent fallback="Við hjá Straxkaka leggjum áherslu á að fagna hvort öðru">
                  {(t) => t('about.why.focus.title')}
                </LanguageContent>
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <LanguageContent fallback="Við trúum því að slíkir viðburðir skipta miklu máli fyrir vinnustaðamenningu. Vinnustaðurinn er miklu meira enn bara vinna, það er staður sem við eyðum stórum hluta af lífinu okkar á. Við ættum að fagna samstarfsfolki okkar, því að góð vinnustaðamenning skiptir miklu máli.">
                  {(t) => t('about.why.focus.desc')}
                </LanguageContent>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              <LanguageContent fallback="Okkar loforð">
                {(t) => t('about.promise.title')}
              </LanguageContent>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <LanguageContent fallback="Við vinnum með traustum bakaríum sem nota hágæða hráefni. Kökurnar eru bakaðar af alúð og afhentar á réttum tíma – alltaf tilbúnar til að gleðja.">
                {(t) => t('about.promise.desc')}
              </LanguageContent>
            </p>
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

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/IMG_7625.png"
                  alt="Founder of StraxKaka"
                  width={192}
                  height={192}
                  className="rounded-full object-cover shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                <LanguageContent fallback="Stofnandi StraxKaka">
                  {(t) => t('about.founder.title')}
                </LanguageContent>
              </h3>
              <p className="text-lg text-gray-600">
                <LanguageContent fallback="Founder of StraxKaka">
                  {(t) => t('about.founder.caption')}
                </LanguageContent>
              </p>
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

