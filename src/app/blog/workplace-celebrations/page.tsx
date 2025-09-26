'use client';

import Navigation from '@/components/Navigation';
import LanguageContent from '@/components/LanguageContent';
import Image from 'next/image';

export default function BlogArticle() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation currentPage="blog" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-full h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg mb-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎂</div>
                <h2 className="text-2xl font-bold">Birthday Cake Celebration</h2>
                <p className="text-lg opacity-90">Delicious cakes for workplace celebrations</p>
              </div>
            </div>
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
          <article className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <LanguageContent fallback="Vinnustaðir eru meira en skrifstofur þar sem verkefni eru unnin – þeir eru samfélög þar sem fólk eyðir stórum hluta lífs síns. Í þessum rýmum skiptir máli að fólk líði vel, finni sig metið og upplifi þakklæti. Ein af einföldustu en áhrifaríkustu leiðunum til að skapa þessa menningu? Að fagna afmælum.">
                {(t) => t('blog.content.intro')}
              </LanguageContent>
            </p>

            <div className="space-y-8">
              {/* Why Celebrations Matter */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Af hverju fagnað skiptir máli">
                    {(t) => t('blog.content.why_matter.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <LanguageContent fallback="Það virðist smátt, en það að muna afmæli sendir sterkt skilaboð: 'Þú skiptir máli hér.' Regluleg fagnaðshátíð styrkir samstöðu og samstarf á milli starfsmanna og eykur tilfinningu um samhug. Þegar fólk finnur sig metið eykst áhugi, samvinna og framleiðni. Með öðrum orðum, smá gjörningur getur haft stór áhrif á vinnustaðinn.">
                    {(t) => t('blog.content.why_matter.desc')}
                  </LanguageContent>
                </p>
              </div>

              {/* The Cost of Forgetting */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Afleiðingar þess að gleyma">
                    {(t) => t('blog.content.cost_forgetting.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <LanguageContent fallback="Aftur á móti, þegar afmæli gleymist, getur það valdið streitu, misskilningi og jafnvel pirringi, sem smátt og smátt skemmir starfsanda og vinnumenningu. Starfsmenn í mannauði reyna að muna öll afmæli, en í uppteknum vinnustofum með mörgum starfsmönnum er auðvelt að gleyma einhverjum. Jafnvel þegar einhver man, getur ferlið við að panta, samræma og afhenda köku verið tímafrekt og stressandi.">
                    {(t) => t('blog.content.cost_forgetting.desc')}
                  </LanguageContent>
                </p>
              </div>

              {/* Enter StraxKaka */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Hér kemur StraxKaka inn">
                    {(t) => t('blog.content.enter_straxkaka.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <LanguageContent fallback="Þar kemur StraxKaka til sögunnar. Þjónustan okkar tryggir að enginn afmælisdagur fari framhjá og léttir álag af mannauði og stjórnendum. Með sjálfvirkum áminningum og einfaldri kökuafhendingu sjáum við til þess að starfsmenn finni sig metna og fagnað—án þess að nokkur þurfi að lyfta fingri.">
                    {(t) => t('blog.content.enter_straxkaka.desc')}
                  </LanguageContent>
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  <LanguageContent fallback="Með því að fjárfesta í StraxKaka fjárfestir fyrirtækið í:">
                    {(t) => t('blog.content.investment.intro')}
                  </LanguageContent>
                </p>
                
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <LanguageContent fallback="Hamingju starfsmanna: Litlir gjörningar eins og að muna afmæli auka starfsanda.">
                        {(t) => t('blog.content.investment.happiness')}
                      </LanguageContent>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <LanguageContent fallback="Samstöðu í teymi: Að deila fagnaðshátíðum styrkir tengsl og samstarf.">
                        {(t) => t('blog.content.investment.cohesion')}
                      </LanguageContent>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <LanguageContent fallback="Framleiðni: Hamingjusamir starfsmenn eru hvattari og skila betri árangri.">
                        {(t) => t('blog.content.investment.productivity')}
                      </LanguageContent>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <LanguageContent fallback="Tíma og álags minnkun mannauðs: Sjálfvirkni sparar tíma og dregur úr álagi.">
                        {(t) => t('blog.content.investment.efficiency')}
                      </LanguageContent>
                    </span>
                  </li>
                </ul>
              </div>

              {/* More Than Just Cake */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  <LanguageContent fallback="Meira en bara köka">
                    {(t) => t('blog.content.more_than_cake.title')}
                  </LanguageContent>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <LanguageContent fallback="Þetta snýst ekki bara um kökuna—heldur um að byggja menningu þar sem fólk finnur sig metið. Hvert afmæli er áminning um að hver starfsmaður skiptir máli, sem skapar vinnustað þar sem fólk hlakkar til að mæta, vinnur betur saman og byggir sterkari tengsl.">
                    {(t) => t('blog.content.more_than_cake.desc')}
                  </LanguageContent>
                </p>
              </div>

              {/* Conclusion */}
              <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <LanguageContent fallback="StraxKaka gleymir ekki afmælum. Hún sætir menninguna og breytir venjulegum vinnudögum í stundir tengsla, gleði og viðurkenningar.">
                    {(t) => t('blog.content.conclusion.main')}
                  </LanguageContent>
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  <LanguageContent fallback="Fjárfestu í hamingju teymisins þíns. Fjárfestu í StraxKaka. Því þegar enginn afmælisdagur gleymist, verður vinnumenningin aðeins sætari á hverjum degi.">
                    {(t) => t('blog.content.conclusion.cta')}
                  </LanguageContent>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 text-center space-x-4">
              <a 
                href="/subscription" 
                className="inline-flex items-center bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                <LanguageContent fallback="Subscription">
                  {(t) => t('nav.subscription')}
                </LanguageContent>
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center bg-white text-yellow-500 border-2 border-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-50 transition-colors"
              >
                <LanguageContent fallback="Contact us">
                  {(t) => t('nav.contact')}
                </LanguageContent>
              </a>
            </div>
          </article>
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


