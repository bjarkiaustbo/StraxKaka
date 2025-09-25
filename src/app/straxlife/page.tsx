'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StraxLife() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center transition-all duration-1000 flex-1 flex flex-col justify-center ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Company Logo/Name */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            StraxLife
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-300 mt-6 font-light">
            Where technology meets life
          </p>
        </div>

        {/* Main Bubbly Tab */}
        <div className="mb-16">
          <Link 
            href="/"
            className="group relative inline-block"
          >
            <div className="relative">
              {/* Bubbly Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300 scale-110 group-hover:scale-125"></div>
              
              {/* Main Button */}
              <div className="relative bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-full px-16 py-8 shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl">
                <span className="text-4xl md:text-5xl font-bold text-black tracking-wider">
                  straxkaka
                </span>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              
              {/* Floating Bubbles */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-bounce delay-100"></div>
              <div className="absolute -top-1 -right-3 w-3 h-3 bg-amber-300 rounded-full opacity-60 animate-bounce delay-300"></div>
              <div className="absolute -bottom-2 -left-1 w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-bounce delay-500"></div>
              <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-bounce delay-700"></div>
            </div>
          </Link>
        </div>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Experience the future of workplace celebrations with our innovative cake delivery service
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-8">
          <p className="text-gray-600 text-sm">
            © 2025 StraxLife. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}


