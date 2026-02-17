import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modals from '@/components/modals/Modals';

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
      <body className="relative flex h-screen w-screen flex-col items-center justify-between bg-[url('/bg.jpg')] bg-cover bg-no-repeat antialiased backdrop-blur-xs">
        <Header />
        {children}
        <Footer />
        <Modals />
      </body>
    </html>
  );
}
