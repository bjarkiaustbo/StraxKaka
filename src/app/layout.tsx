import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StraxKaka - Afmæliskaka kerfi",
  description: "Afmæliskaka kerfi - Fögnum öllum, það skiptir máli. StraxKaka tryggir að enginn afmælisdagur gleymist á vinnustaðnum.",
  keywords: "afmæliskökur, starfsmenn, fyrirtæki, Ísland, sjálfvirkni, AI, kökur, afmælisdagar, HR sjálfvirkni, fyrirtækjaþjónusta",
  authors: [{ name: "StraxKaka" }],
  creator: "StraxKaka",
  publisher: "StraxKaka",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'is_IS',
    url: 'https://www.straxkaka.is',
    siteName: 'StraxKaka',
    title: 'StraxKaka - Afmæliskaka kerfi',
    description: 'Afmæliskaka kerfi - Fögnum öllum, það skiptir máli.',
    images: [
      {
        url: '/cake-favicon.svg',
        width: 200,
        height: 200,
        alt: 'StraxKaka Cake Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StraxKaka - Afmæliskaka kerfi',
    description: 'Afmæliskaka kerfi - Fögnum öllum, það skiptir máli.',
    images: ['/cake-favicon.svg'],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/cake-favicon.svg',
    shortcut: '/cake-favicon.svg',
    apple: '/cake-favicon.svg',
  },
};

// Structured data for Google logo
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "StraxKaka",
  "url": "https://www.straxkaka.is",
  "logo": "https://www.straxkaka.is/cake-favicon.svg",
  "description": "Afmæliskaka kerfi - Fögnum öllum, það skiptir máli.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IS"
  },
  "sameAs": [
    "https://www.straxkaka.is"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <SubscriptionProvider>
            <GoogleAnalytics />
            {children}
          </SubscriptionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
