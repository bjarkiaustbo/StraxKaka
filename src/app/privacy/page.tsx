'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

export default function Privacy() {
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
                  <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.home')}</Link>
                  <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.about')}</Link>
                  <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.services')}</Link>
                  <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('nav.contact')}</Link>
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            <LanguageContent fallback="PRIVACY POLICY">
              {(t) => t('privacy.title')}
            </LanguageContent>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <LanguageContent fallback={<strong>Last updated:</strong>}>
                {(t) => <strong>{t('privacy.last_updated')}:</strong>}
              </LanguageContent>
              <LanguageContent fallback="September 26, 2025">
                {(t) => t('privacy.date')}
              </LanguageContent>
            </p>

            <p className="text-gray-700 mb-6">
              This Privacy Notice for <strong>StraxLife</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), describes how and why we might access, collect, store, use, and/or share (&ldquo;process&rdquo;) your personal information when you use our services (&ldquo;Services&rdquo;), including when you:
            </p>
            
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Visit our website at <a href="https://straxkaka.is" className="text-yellow-600 hover:text-yellow-700">straxkaka.is</a> or any website of ours that links to this Privacy Notice</li>
              <li>Use <strong>StraxKaka</strong>. <strong>A cake automation service, that delivers cakes to companies on birthdays</strong></li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            
            <p className="text-gray-700 mb-6">
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:orders.straxkaka@outlook.com" className="text-yellow-600 hover:text-yellow-700">orders.straxkaka@outlook.com</a>.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hvaða upplýsingar söfnum við</h2>
            <p className="text-gray-700 mb-4">Við söfnum eftirfarandi tegundum persónuupplýsinga:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Upplýsingar um fyrirtæki:</strong> Nafn fyrirtækis, heimilisfang, símanúmer, netfang</li>
              <li><strong>Upplýsingar um starfsmenn:</strong> Nafn, afmælisdagur, starfsheiti, deild</li>
              <li><strong>HR kerfisupplýsingar:</strong> Gagnagrunnar sem innihalda afmælisdagaupplýsingar</li>
              <li><strong>Vafrakökur:</strong> Upplýsingar um vafrann þinn og notkun á vefsíðunni</li>
              <li><strong>Samskiptaupplýsingar:</strong> Skilaboð sem þú sendir okkur í gegnum tengiliðaform</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Tilgangur vinnslu</h2>
            <p className="text-gray-700 mb-4">Við vinnum persónuupplýsingar fyrir eftirfarandi tilgangi:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Afmælisdagaskráning og kökupöntun fyrir starfsmenn fyrirtækja</li>
              <li>AI sjálfvirkni fyrir afmæliskökur</li>
              <li>Samskipti við viðskiptavini</li>
              <li>Þjónustuþróun og gæðastjórnun</li>
              <li>Löglegar skyldur og reglufylgni</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Réttarstoð vinnslu</h2>
            <p className="text-gray-700 mb-6">
              Við vinnum persónuupplýsingar á grundvelli samþykkis, samnings, löglegs hagsmuna og löglegra skyldna 
              í samræmi við 6. gr. GDPR.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Hvað lengi geymum við upplýsingarnar</h2>
            <p className="text-gray-700 mb-6">
              Við geymum persónuupplýsingar eins lengi og nauðsynlegt er fyrir tilgang vinnslunnar eða eins lengi 
              og lög krefjast. Afmælisdagaupplýsingar eru geymdar þar til starfsmaður hættir hjá fyrirtækinu eða 
              þjónustusamningur lýkur.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Deiling upplýsinga</h2>
            <p className="text-gray-700 mb-6">
              Við deilum persónuupplýsingum aðeins með þriðja aðila sem eru nauðsynlegir fyrir þjónustuna, 
              svo sem kökubúðir fyrir afhendingu. Allir þriðju aðilar eru bundnir samningum um persónuvernd.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Réttindi þín</h2>
            <p className="text-gray-700 mb-4">Þú hefur eftirfarandi réttindi:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Upplýsingaréttur:</strong> Að fá upplýsingar um vinnslu persónuupplýsinga</li>
              <li><strong>Breytingaréttur:</strong> Að fá leiðréttingu rangra upplýsinga</li>
              <li><strong>Eyðingarréttur:</strong> Að fá eytt persónuupplýsingum</li>
              <li><strong>Takmarkaniréttur:</strong> Að takmarka vinnslu persónuupplýsinga</li>
              <li><strong>Gagnabirtingarréttur:</strong> Að fá persónuupplýsingar í rafrænu formi</li>
              <li><strong>Mótmælaréttur:</strong> Að mótmæla vinnslu persónuupplýsinga</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Öryggi</h2>
            <p className="text-gray-700 mb-6">
              Við notum viðeigandi tæknilega og skipulagsleg öryggisráðstafanir til að vernda persónuupplýsingar 
              gegn óleyfilegri vinnslu, tapi, eyðingu eða skemmdum.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Vafrakökur</h2>
            <p className="text-gray-700 mb-6">
              Vefsíðan notar vafrakökur til að bæta notendaupplifun. Þú getur stillt vafrann þinn til að 
              hafna vafrakökum, en það getur haft áhrif á virkni vefsíðunnar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Breytingar á stefnunni</h2>
            <p className="text-gray-700 mb-6">
              Við getum breytt þessari persónuverndarstefnu. Breytingar verða birtar á vefsíðunni og 
              þú verður tilkynnt um verulegar breytingar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Hafa samband</h2>
            <p className="text-gray-700 mb-4">
              Ef þú hefur spurningar um þessa persónuverndarstefnu eða vilt nýta réttindi þín, 
              hafðu samband við okkur:
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700"><strong>StraxLife ehf.</strong></p>
              <p className="text-gray-700">Netfang: orders.straxkaka@outlook.com</p>
              <p className="text-gray-700">Sími: +354 790 4777</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Kvörtun</h2>
            <p className="text-gray-700 mb-6">
              Þú getur kvartað til Persónuverndar um vinnslu persónuupplýsinga. 
              Upplýsingar um kvörtunarferlið finnur þú á vefsíðu Persónuverndar.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-500">StraxKaka</h3>
              <p className="text-gray-400">
                AI sjálfvirkni fyrir afmæliskökur fyrir íslensk fyrirtæki.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Þjónusta</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Afmælisdagaskráning</li>
                <li>AI sjálfvirkni</li>
                <li>Kökupöntun</li>
                <li>Afhending</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Fyrirtæki</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Um okkur</li>
                <li>Hafa samband</li>
                <li>Verðskrá</li>
                <li><a href="/blog/workplace-celebrations" className="hover:text-yellow-400">Blogg</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Löglegar síður</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-yellow-400">Persónuverndarstefna</a></li>
                <li><a href="/terms" className="hover:text-yellow-400">Skilmálar</a></li>
                <li><a href="/cookies" className="hover:text-yellow-400">Vafrakökur</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StraxKaka. Allur réttur áskilinn.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
