'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Terms() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Þjónustuskilmálar</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Síðast uppfært:</strong> 18. september 2025
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Inngangur</h2>
            <p className="text-gray-700 mb-6">
              Þessir skilmálar gilda um notkun á þjónustu StraxKaka ehf. (&ldquo;fyrirtækið&rdquo;, &ldquo;við&rdquo;, &ldquo;okkur&rdquo;) 
              sem veitir AI sjálfvirkni þjónustu fyrir afmæliskökur fyrir fyrirtæki. Með því að nota þjónustuna 
              samþykkir þú þessa skilmála.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Lýsing á þjónustu</h2>
            <p className="text-gray-700 mb-4">StraxKaka veitir eftirfarandi þjónustu:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Afmælisdagaskráning og gagnafærsla úr HR kerfum</li>
              <li>AI sjálfvirkni fyrir kökupöntun</li>
              <li>Samskipti við kökubúðir fyrir afhendingu</li>
              <li>Tilkynningar og upplýsingar um afmælisdaga</li>
              <li>Stuðningur og þjónusta við viðskiptavini</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Verð og greiðslur</h2>
            <p className="text-gray-700 mb-4">
              Verð fyrir þjónustuna er skilgreint í verðskrá sem er aðgengileg á vefsíðunni. 
              Verð getur verið breytt með 30 daga fyrirvara.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Greiðslur eru í gjalddaga samkvæmt reikningi</li>
              <li>Vanskilagjöld geta verið lagt á seinkuð greiðslur</li>
              <li>Allar verð eru með virðisaukaskatti</li>
              <li>Greiðslur eru ekki endurgreiddar fyrir þjónustu sem hefur verið veitt</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Skyldur viðskiptavina</h2>
            <p className="text-gray-700 mb-4">Viðskiptavinir skulu:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Veita réttar og nákvæmar upplýsingar um starfsmenn</li>
              <li>Tryggja að þeir hafi rétt til að deila persónuupplýsingum</li>
              <li>Greiða fyrir þjónustuna á réttum tíma</li>
              <li>Fylgja leiðbeiningum um notkun þjónustunnar</li>
              <li>Hafa samband við okkur um breytingar á starfsmannastöðu</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Ábyrgð og takmarkanir</h2>
            <p className="text-gray-700 mb-4">
              StraxKaka tekur ábyrgð á því að veita þjónustuna með viðeigandi hætti, en takmarkar ábyrgð sína 
              í eftirfarandi málum:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Óvæntar truflanir í kökubúðum eða afhendingu</li>
              <li>Vandamál í HR kerfum viðskiptavina</li>
              <li>Óvæntar breytingar í lögum eða reglugerðum</li>
              <li>Hávaði eða önnur óvænt atvik</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Gagnsemi og persónuvernd</h2>
            <p className="text-gray-700 mb-6">
              Við vinnum persónuupplýsingar í samræmi við persónuverndarstefnu okkar og gagnsemi. 
              Upplýsingar eru aðeins notaðar fyrir tilgang þjónustunnar og eru ekki seldar til þriðja aðila.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Uppsagnir</h2>
            <p className="text-gray-700 mb-4">
              Hvor aðili getur sagt upp samningnum með 30 daga fyrirvara. Uppsögn verður send skriflega.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Viðskiptavinir geta sagt upp hvenær sem er</li>
              <li>StraxKaka getur sagt upp fyrir brot á skilmálum</li>
              <li>Greiðslur fyrir þjónustu sem hefur verið veitt eru ekki endurgreiddar</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Eignarréttur</h2>
            <p className="text-gray-700 mb-6">
              Allir hugbúnaður, vörumerki og hugverk sem StraxKaka notar eru í eigu fyrirtækisins. 
              Viðskiptavinir fá ekki eignarrétt að hugbúnaði eða tækni.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Breytingar á skilmálum</h2>
            <p className="text-gray-700 mb-6">
              Við getum breytt þessum skilmálum hvenær sem er. Breytingar verða birtar á vefsíðunni 
              og verða í gildi 30 dögum eftir birtingu. Notkun þjónustunnar eftir breytingar telst 
              samþykki nýrra skilmála.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Ágreiningur og lög</h2>
            <p className="text-gray-700 mb-6">
              Þessir skilmálar eru í samræmi við íslenskan lög. Ágreiningur skal leysa með samningaviðræðum 
              eða fyrir íslenskum dómstólum.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Hafa samband</h2>
            <p className="text-gray-700 mb-4">
              Ef þú hefur spurningar um þessa skilmála, hafðu samband við okkur:
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700"><strong>StraxKaka ehf.</strong></p>
              <p className="text-gray-700">Netfang: orders.straxkaka@outlook.com</p>
              <p className="text-gray-700">Sími: +354 790 4777</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Gildi</h2>
            <p className="text-gray-700 mb-6">
              Ef einhver ákvæði í þessum skilmálum er ógilt, skulu hin ákvæðin halda gildi sínu. 
              Þessir skilmálar taka gildi frá því að þú byrjar að nota þjónustuna.
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
                <li><a href="/legal" className="hover:text-yellow-400">Löglegar upplýsingar</a></li>
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
