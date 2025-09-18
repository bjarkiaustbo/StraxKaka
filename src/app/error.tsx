'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Eitthvað fór úrskeiðis</h1>
          <p className="text-gray-600 mb-8">
            Því miður kom upp villa á vefsíðunni. Við erum að vinna að því að laga þetta.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors mr-4"
          >
            Reyna aftur
          </button>
          
          <Link 
            href="/" 
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
          >
            Fara á heimasíðu
          </Link>
          
          <div className="text-sm text-gray-500 mt-6">
            <p>Ef vandamálið heldur áfram, hafðu samband við okkur:</p>
            <p className="mt-2">
              <a href="mailto:orders.straxkaka@outlook.com" className="text-yellow-600 hover:text-yellow-700">
                orders.straxkaka@outlook.com
              </a>
            </p>
            <p>
              <a href="tel:+3547904777" className="text-yellow-600 hover:text-yellow-700">
                +354 790 4777
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

