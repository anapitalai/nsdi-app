import { prisma } from '@/db/prisma';
import { SessionProvider } from "next-auth/react";

// --- DB Connection Troubleshooting ---
(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    // eslint-disable-next-line no-console
    console.log('✅ Database connection successful:', process.env.DATABASE_URL);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Database connection failed:',
      error instanceof Error ? error.message : error,
      '\nDATABASE_URL:', process.env.DATABASE_URL
    );
  }
})();

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Header from '@/components/shared/header';
import Footer from '@/components/footer';
import SideDrawer from '@/components/shared/side-drawer';

import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  // If on the satellite map page, render only the map (no header/footer/wrapper)
  const isMapPage = pathname === '/satellite-map';
  return (
    <SessionProvider>
      {isMapPage ? (
        <>{children}</>
      ) : (
        <div className='flex h-screen flex-col'>
          <SideDrawer />
          <Header />
          <main className='flex-1 wrapper'>{children}</main>
          <Footer />
        </div>
      )}
    </SessionProvider>
  );
}
