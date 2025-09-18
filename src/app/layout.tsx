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
  title: "StraxKaka - Aldrei gleyma afmælisdögum starfsmanna",
  description: "AI sjálfvirkni fyrirtæki sem panta kökur fyrir starfsmenn fyrirtækja svo enginn gleymi afmælisdögum. StraxKaka - afmæliskökur fyrir íslensk fyrirtæki.",
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
    title: 'StraxKaka - Aldrei gleyma afmælisdögum starfsmanna',
    description: 'AI sjálfvirkni fyrirtæki sem panta kökur fyrir starfsmenn fyrirtækja svo enginn gleymi afmælisdögum.',
    images: [
      {
        url: '/logo.svg',
        width: 200,
        height: 60,
        alt: 'StraxKaka Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StraxKaka - Aldrei gleyma afmælisdögum starfsmanna',
    description: 'AI sjálfvirkni fyrirtæki sem panta kökur fyrir starfsmenn fyrirtækja svo enginn gleymi afmælisdögum.',
    images: ['/logo.svg'],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
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
