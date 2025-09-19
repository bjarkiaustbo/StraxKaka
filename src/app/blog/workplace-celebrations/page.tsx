'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import LanguageContent from '@/components/LanguageContent';

export default function BlogArticle() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation currentPage="blog" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Birthday cake celebration" 
              className="w-full h-64 object-cover rounded-2xl shadow-lg mb-8"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <LanguageContent fallback="Mikilvægi afmælisfagnaðar á vinnustaðnum">
                {(t) => t('blog.hero.title')}
              </LanguageContent>
            </h1>
            <p className="text-xl text-gray-600">
              <LanguageContent fallback="Hvernig afmælisfagnaður getur bætt stemningu og sparað tíma">
                {(t) => t('blog.hero.subtitle')}
              </LanguageContent>
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <LanguageContent fallback="Afmælisfagnaður á vinnustaðnum er ekki bara góður fyrir starfsmenn - þeir eru líka mikilvægir fyrir fyrirtækið. Rannsóknir sýna að starfsmenn sem finna sig verðlaunaðir og virtir eru líklegri til að vera ánægðir með vinnuna og vera áfram hjá fyrirtækinu.">
                {(t) => t('blog.content.intro')}
              </LanguageContent>
            </p>

            <div className="space-y-12">
              {/* Morale Section */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Bætir stemningu og hamingju">
                    {(t) => t('blog.content.morale.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <LanguageContent fallback="Afmælisfagnaður sýnir starfsmönnum að þeir séu virtir og verðlaunaðir. Þetta skilar sér í aukinni hamingju, betri stemningu og meiri vinnufúsleika.">
                    {(t) => t('blog.content.morale.desc')}
                  </LanguageContent>
                </p>
              </div>

              {/* Recognition Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Starfsmenn finna sig séðir">
                    {(t) => t('blog.content.recognition.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <LanguageContent fallback="Þegar fyrirtæki minnist á afmælisdaga starfsmanna sýnir það að þeir séu ekki bara númer. Þetta byggir upp tengingu milli starfsmanna og fyrirtækis.">
                    {(t) => t('blog.content.recognition.desc')}
                  </LanguageContent>
                </p>
              </div>

              {/* Motivation Section */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Aukir hvatningu">
                    {(t) => t('blog.content.motivation.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <LanguageContent fallback="Starfsmenn sem finna sig verðlaunaðir eru líklegri til að leggja sig fram meira og vera afkastamikilir. Afmælisfagnaður er einfaldur en áhrifaríkur leið til að sýna þakklæti.">
                    {(t) => t('blog.content.motivation.desc')}
                  </LanguageContent>
                </p>
              </div>

              {/* Time Saving Section */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Sparar tíma fyrir HR deildina">
                    {(t) => t('blog.content.time_saving.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <LanguageContent fallback="Með StraxKaka þurfa HR starfsmenn ekki að hugsa um afmælisdaga. Kerfið sér um allt - frá skráningu til afhendingar. Þetta gefur HR deildinni tíma til að einbeita sér að öðrum mikilvægum verkefnum.">
                    {(t) => t('blog.content.time_saving.desc')}
                  </LanguageContent>
                </p>
              </div>
            </div>

            {/* Conclusion */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                <LanguageContent fallback="Afmælisfagnaður á vinnustaðnum er ekki lúxus - það er nauðsynlegt fyrir heilbrigða vinnustofukúltúr. Með StraxKaka getur fyrirtækið þitt auðveldlega byrjað að fagna afmælisdögum án þess að eyða tíma í skipulagningu.">
                  {(t) => t('blog.content.conclusion')}
                </LanguageContent>
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <a 
                href="/subscription" 
                className="inline-flex items-center bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                <LanguageContent fallback="Byrjaðu að nota StraxKaka">
                  {(t) => t('home.cta.subscribe')}
                </LanguageContent>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
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
                <LanguageContent fallback="Aldrei gleyma afmælisdögum starfsmanna">
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
                  <LanguageContent fallback="Afmælisdagar">
                    {(t) => t('footer.services.birthday')}
                  </LanguageContent>
                </li>
                <li>
                  <LanguageContent fallback="Gervigreind">
                    {(t) => t('footer.services.ai')}
                  </LanguageContent>
                </li>
                <li>
                  <LanguageContent fallback="Pöntun">
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
                <LanguageContent fallback="Lögfræði">
                  {(t) => t('footer.legal.title')}
                </LanguageContent>
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/privacy" className="hover:text-yellow-500 transition-colors">
                    <LanguageContent fallback="Persónuvernd">
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
