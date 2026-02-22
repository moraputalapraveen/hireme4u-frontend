import { Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Jobs } from './pages/Jobs';
import { JobDetail } from './pages/JobDetail';
import { Freshers } from './pages/Freshers';
import { Admin } from './pages/Admin';
import { AdminDashboard } from './pages/AdminDashboard'; // Add this
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Tools } from './pages/Tools';
import { NotFound } from './pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:slug" element={<JobDetail />} />
        <Route path="freshers" element={<Freshers />} />
        
        {/* Secret admin routes */}
        <Route path="admin/secret123" element={<Admin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} /> {/* Add this */}
        
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="tools" element={<Tools />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}