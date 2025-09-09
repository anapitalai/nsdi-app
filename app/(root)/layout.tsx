import { prisma } from '@/db/prisma';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <SideDrawer />
      <Header />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer />
    </div>
  );
}
