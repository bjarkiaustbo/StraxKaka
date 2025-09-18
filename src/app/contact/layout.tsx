import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hafa samband - StraxKaka',
  description: 'Hafðu samband við StraxKaka fyrir ókeypis samráðstefnu um AI sjálfvirkni fyrir afmæliskökur fyrir fyrirtækið þitt.',
  keywords: 'hafa samband, StraxKaka, samráðstefna, afmæliskökur, AI sjálfvirkni, fyrirtæki',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

