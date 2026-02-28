import { Link } from 'react-router-dom';
import { CheckCircle, Bell } from 'lucide-react';

export function AlertVerified() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Email Verified Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          You're now subscribed to job alerts. You'll start receiving notifications based on your preferences.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <Bell className="w-4 h-4" />
            <span className="font-medium">What's next?</span>
          </div>
          <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
            <li>Daily job alerts at 8 AM</li>
            <li>Jobs matching your selected categories</li>
            <li>One-click unsubscribe anytime</li>
          </ul>
        </div>
        
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}