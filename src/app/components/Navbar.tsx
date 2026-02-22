import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { isAdminLoggedIn } = useJobs();

  // Check admin status on component mount and when location changes
  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
  }, [location, isAdminLoggedIn]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Freshers', path: '/freshers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tools', path: '/tools' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">HireMe4U</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* ONLY Show Post Job button when admin is logged in */}
            {isAdmin && (
              <Link
                to="/admin/secret123"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Job
              </Link>
            )}
            
            {/* NO LOGIN BUTTON HERE - Login only via direct URL */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Post Job button - only for logged in admins */}
            {isAdmin && (
              <Link
                to="/admin/secret123"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-2 bg-blue-600 text-white px-4 py-3 rounded-lg text-center hover:bg-blue-700"
              >
                Post Job
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}