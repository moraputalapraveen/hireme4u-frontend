import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { VisitorTracker } from '../components/VisitorTracker';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <VisitorTracker /> {/* This tracks every page visit */}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}