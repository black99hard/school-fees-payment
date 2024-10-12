'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface BursaryLayoutProps {
  children: React.ReactNode;
}

const BursaryLayout: React.FC<BursaryLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // Redirect to login if no session exists
    if (!session) {
      router.push('/login');
    }

    // Redirect if role is not hod
    if (session?.user?.role !== 'bursary') {
      router.push('/unauthorized');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'bursary') {
    return null; // Optionally, render a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BursaryLayout;
