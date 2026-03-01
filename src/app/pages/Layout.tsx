import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import AnalyticsService from '../services/AnalyticsService';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Track every page view
    AnalyticsService.trackPageView(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}