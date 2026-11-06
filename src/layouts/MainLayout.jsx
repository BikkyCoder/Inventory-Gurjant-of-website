import React from 'react';
import Footer from '../components/common/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}