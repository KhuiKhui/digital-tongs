import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Digital Tongs',
  description: 'Pick litter and gacha!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen flex-col items-center justify-between antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
