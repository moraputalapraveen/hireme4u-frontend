import { Link } from 'react-router-dom';
import { XCircle, RefreshCw } from 'lucide-react';

export function AlertUnsubscribed() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-10 h-10 text-gray-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Unsubscribed Successfully
        </h1>
        
        <p className="text-gray-600 mb-6">
          You've been removed from our job alert list. You'll no longer receive email notifications.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            Want to subscribe again? You can always sign up for alerts on our website.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            to="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Resubscribe
          </Link>
        </div>
      </div>
    </div>
  );
}