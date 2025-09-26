import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Löglegar upplýsingar - StraxKaka',
  description: 'Löglegar upplýsingar um StraxLife ehf. - fyrirtækisupplýsingar, skráning og tengiliðir.',
  keywords: 'löglegar upplýsingar, StraxKaka, fyrirtæki, skráning, tengiliðir',
};

export default function Legal() {
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
                  <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Heim</Link>
                  <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">Um okkur</Link>
                  <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">Þjónusta</Link>
                  <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Hafa samband</Link>
                </div>
                <Link href="/contact" className="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors font-semibold">
                  Byrja núna
                </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Löglegar upplýsingar</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fyrirtækisupplýsingar</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">StraxLife ehf.</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Fyrirtækisheiti:</strong> StraxLife ehf.</p>
                  <p className="text-gray-700"><strong>Kennitala:</strong> 123456-7890</p>
                  <p className="text-gray-700"><strong>Stofnun:</strong> 2025</p>
                  <p className="text-gray-700"><strong>Rechtsform:</strong> Einstaklingsfyrirtæki</p>
                </div>
                <div>
                  <p className="text-gray-700"><strong>Netfang:</strong></p>
                  <p className="text-gray-700">orders.straxkaka@outlook.com</p>
                  <p className="text-gray-700"><strong>Sími:</strong></p>
                  <p className="text-gray-700">+354 790 4777</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tengiliðir</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Almennar upplýsingar</h3>
                  <p className="text-gray-700">Netfang: orders.straxkaka@outlook.com</p>
                  <p className="text-gray-700">Sími: +354 790 4777</p>
                  <p className="text-gray-700">Vefsíða: www.straxkaka.is</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Löglegar málefni</h3>
                  <p className="text-gray-700">Netfang: orders.straxkaka@outlook.com</p>
                  <p className="text-gray-700">Sími: +354 790 4777</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stjórnun og forstjóri</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700"><strong>Forstjóri:</strong> Jón Jónsson</p>
              <p className="text-gray-700"><strong>Stjórn:</strong> Jón Jónsson (formaður)</p>
              <p className="text-gray-700"><strong>Endurskoðandi:</strong> [Nafn endurskoðanda]</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skráning og leyfi</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Fyrirtækjaskrá:</strong> Skráð í Fyrirtækjaskrá Íslands</li>
                <li><strong>VSK númer:</strong> IS1234567890</li>
                <li><strong>Vinnuveitastofnun:</strong> Leyfi fyrir vinnuveitendur</li>
                <li><strong>Persónuvernd:</strong> Skráð hjá Persónuvernd</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eignarréttur og vörumerki</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-4">
                Allur efni á vefsíðunni, þar á meðal texti, myndir, hönnun og hugbúnaður, 
                er í eigu StraxLife ehf. eða er notað með leyfi eiganda.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Vörumerki:</strong> StraxKaka er vörumerki StraxLife ehf.
              </p>
              <p className="text-gray-700">
                <strong>Hugverk:</strong> Allur hugbúnaður og tækni er verndaður með höfundarrétti.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ábyrgð og fyrirvara</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-4">
                StraxLife ehf. tekur ábyrgð á því að veita þjónustuna með viðeigandi hætti, 
                en takmarkar ábyrgð sína í samræmi við íslenskan lög.
              </p>
              <p className="text-gray-700 mb-4">
                Upplýsingar á vefsíðunni eru veittar án fyrirvara um nákvæmni eða tímanlega gildi.
              </p>
              <p className="text-gray-700">
                StraxLife ehf. tekur ekki ábyrgð á skaða sem stafa af notkun vefsíðunnar.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gildandi lög</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-4">
                Þessar löglegar upplýsingar eru í samræmi við íslenskan lög og reglugerðir, 
                þar á meðal:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Lög um fyrirtæki</li>
                <li>Lög um persónuvernd og vinnslu persónuupplýsinga</li>
                <li>Lög um vafrakökur</li>
                <li>Lög um vörumerki</li>
                <li>Lög um höfundarrétt</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ágreiningur</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-4">
                Ágreiningur milli StraxLife ehf. og viðskiptavina skal leysa með samningaviðræðum 
                eða fyrir íslenskum dómstólum.
              </p>
              <p className="text-gray-700">
                <strong>Dómstóll:</strong> Reykjavíkursýslu dómstóll
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Breytingar</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700">
                StraxLife ehf. getur breytt þessum löglegum upplýsingum hvenær sem er. 
                Breytingar verða birtar á vefsíðunni og verða í gildi frá birtingu.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hafa samband</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Ef þú hefur spurningar um þessar löglegu upplýsingar, hafðu samband við okkur:
              </p>
              <p className="text-gray-700"><strong>StraxLife ehf.</strong></p>
              <p className="text-gray-700">Netfang: orders.straxkaka@outlook.com</p>
              <p className="text-gray-700">Sími: +354 790 4777</p>
            </div>
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
