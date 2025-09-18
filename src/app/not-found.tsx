import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Síða fannst ekki - StraxKaka',
  description: 'Síðan sem þú leitar að fannst ekki. Farðu aftur á heimasíðuna StraxKaka.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-yellow-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Síða fannst ekki</h2>
          <p className="text-gray-600 mb-8">
            Því miður fannst síðan sem þú leitar að ekki. Hún gæti hafa verið færð, 
            eytt eða þú gafst rangt vefslóð.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
          >
            Fara á heimasíðu
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Eða prófaðu að:</p>
            <div className="mt-2 space-x-4">
              <Link href="/about" className="text-yellow-600 hover:text-yellow-700">
                Um okkur
              </Link>
              <Link href="/services" className="text-yellow-600 hover:text-yellow-700">
                Þjónusta
              </Link>
              <Link href="/contact" className="text-yellow-600 hover:text-yellow-700">
                Hafa samband
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

