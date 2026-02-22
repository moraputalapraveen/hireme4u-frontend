import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            to="/jobs"
            className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5" />
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
