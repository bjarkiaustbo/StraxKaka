'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LanguageContent from '@/components/LanguageContent';

export default function Cookies() {
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
            <LanguageContent fallback="Cookie Policy">
              {(t) => t('cookies.title')}
            </LanguageContent>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <LanguageContent fallback={<strong>Last updated:</strong>}>
                {(t) => <strong>{t('cookies.last_updated')}:</strong>}
              </LanguageContent>
              <LanguageContent fallback="September 18, 2025">
                {(t) => t('cookies.date')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <LanguageContent fallback="1. What are cookies?">
                {(t) => `1. ${t('cookies.what_are')}`}
              </LanguageContent>
            </h2>
            <p className="text-gray-700 mb-6">
              <LanguageContent fallback="Cookies are small files that are stored on your computer or phone when you visit a website. They help the website remember information about you, so you can use it better the next time you come back.">
                {(t) => t('cookies.what_are_text')}
              </LanguageContent>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hvernig notum við vafrakökur</h2>
            <p className="text-gray-700 mb-4">StraxKaka notar vafrakökur fyrir eftirfarandi tilgangi:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Nauðsynlegar vafrakökur:</strong> Til að vefsíðan virki rétt</li>
              <li><strong>Notkunargreining:</strong> Til að skilja hvernig fólk notar vefsíðuna</li>
              <li><strong>Notendaupplifun:</strong> Til að bæta virkni og hönnun</li>
              <li><strong>Markaðssetning:</strong> Til að sýna viðeigandi efni</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Tegundir vafrakaka</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Nauðsynlegar vafrakökur</h3>
            <p className="text-gray-700 mb-4">
              Þessar vafrakökur eru nauðsynlegar til að vefsíðan virki rétt. Þær geta ekki verið slökktar 
              og eru ekki notaðar til að safna persónuupplýsingum.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Session vafrakökur fyrir innskráningu</li>
              <li>Síðustillingar og valkostir</li>
              <li>Öryggisvafrakökur</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Greiningarvafrakökur</h3>
            <p className="text-gray-700 mb-4">
              Þessar vafrakökur hjálpa okkur að skilja hvernig fólk notar vefsíðuna með því að safna 
              upplýsingum um síðuheimsóknir og notkun.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Google Analytics vafrakökur</li>
              <li>Notkunargreining og tölfræði</li>
              <li>Vefsíðuvirkni og hraði</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Markaðssetningarvafrakökur</h3>
            <p className="text-gray-700 mb-4">
              Þessar vafrakökur eru notaðar til að sýna viðeigandi auglýsingar og efni 
              sem gæti verið áhugavert fyrir þig.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Auglýsingavafrakökur</li>
              <li>Félagslegar miðlarvafrakökur</li>
              <li>Markaðssetning og markviss auglýsing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Þriðja aðila vafrakökur</h2>
            <p className="text-gray-700 mb-4">Við notum eftirfarandi þriðja aðila vafrakökur:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Google Analytics:</strong> Fyrir vefsíðugreiningu</li>
              <li><strong>Google Fonts:</strong> Fyrir leturgerðir</li>
              <li><strong>Vercel:</strong> Fyrir vefsíðuhýsing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Hvernig stjórnar þú vafrakökum</h2>
            <p className="text-gray-700 mb-4">Þú getur stjórnað vafrakökum á eftirfarandi hátt:</p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Vafraskjáir</h3>
            <p className="text-gray-700 mb-4">
              Flestir vafraskjáir leyfa þér að stjórna vafrakökum í stillingum. Þú getur:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Skoðað hvaða vafrakökur eru vistaðar</li>
              <li>Eytt vafrakökum</li>
              <li>Hindrað vafrakökur fyrir framtíð</li>
              <li>Stillt vafrakökur fyrir tiltekna vefsíður</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Vafrakökustjórnun</h3>
            <p className="text-gray-700 mb-6">
              Þú getur notað vafrakökustjórnunartól til að stjórna vafrakökum á vefsíðunni. 
              Þú getur valið hvaða vafrakökur þú vilt leyfa.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Áhrif af því að slökkva á vafrakökum</h2>
            <p className="text-gray-700 mb-6">
              Ef þú slökkir á vafrakökum getur það haft áhrif á virkni vefsíðunnar. Sumar eiginleikar 
              gætu ekki virkað rétt eða vefsíðan gæti ekki munað stillingar þínar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Vafrakökur fyrir börn</h2>
            <p className="text-gray-700 mb-6">
              Vefsíðan okkar er ekki ætluð fyrir börn yngri en 13 ára. Við söfnum ekki vísvitandi 
              persónuupplýsingum frá börnum yngri en 13 ára.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Breytingar á vafrakökustefnunni</h2>
            <p className="text-gray-700 mb-6">
              Við getum breytt þessari vafrakökustefnu hvenær sem er. Breytingar verða birtar á vefsíðunni 
              og þú verður tilkynnt um verulegar breytingar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Hafa samband</h2>
            <p className="text-gray-700 mb-4">
              Ef þú hefur spurningar um vafrakökustefnuna, hafðu samband við okkur:
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700"><strong>StraxLife ehf.</strong></p>
              <p className="text-gray-700">Netfang: orders.straxkaka@outlook.com</p>
              <p className="text-gray-700">Sími: +354 790 4777</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Nánari upplýsingar</h2>
            <p className="text-gray-700 mb-6">
              Fyrir nánari upplýsingar um vafrakökur og persónuvernd, sjá 
              <a href="/privacy" className="text-yellow-600 hover:text-yellow-700">persónuverndarstefnu okkar</a>.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Vafrakökustefna</h2>
            <p className="text-gray-700 mb-6">
              Nánari upplýsingar um vafrakökur má finna á 
              <a href="https://www.termsfeed.com/live/024fcc1c-47d4-4ab0-bdd3-c28fe60a5c27" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-yellow-600 hover:text-yellow-700">
                vafrakökustefnu okkar
              </a>.
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
