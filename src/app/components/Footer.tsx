import { Link } from 'react-router';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl text-white">Hireme4u</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted platform for finding the best job opportunities for freshers and
              experienced developers. Connecting talent with opportunities since 2026.
            </p>
            <div className="flex flex-col gap-2">
              
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-blue-500 transition-colors">
                  All Jobs
                </Link>
              </li>
              <li>
                <Link to="/freshers" className="hover:text-blue-500 transition-colors">
                  Freshers Jobs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-blue-500 transition-colors">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-blue-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Hireme4u. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
