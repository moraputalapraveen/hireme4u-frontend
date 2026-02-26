import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AdSenseSlot } from '../components/AdSenseSlot'; // Add this import
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Mobile Ad - shows only on mobile devices */}
      <AdSenseSlot variant="mobile" />
      
      <main className="flex-1">
        <Outlet /> {/* Your page content appears here */}
      </main>
      
      <Footer />
      
      {/* Social Bar - sticky at bottom of all pages */}
      <AdSenseSlot variant="social" />
      
      <Toaster />
    </div>
  );
}