import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login or show loading
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} StylistHub. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;