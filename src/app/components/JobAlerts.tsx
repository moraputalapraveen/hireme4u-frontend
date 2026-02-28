import { useState } from 'react';
import { Bell, Mail, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import config from '../../../config';

interface JobAlertsProps {
  className?: string;
}

export function JobAlerts({ className = '' }: JobAlertsProps) {
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [frequency, setFrequency] = useState('daily');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const categoryOptions = [
    { value: 'IT', label: 'IT Jobs', color: 'blue' },
    { value: 'Non-IT', label: 'Non-IT Jobs', color: 'green' },
    { value: 'Remote', label: 'Remote Jobs', color: 'purple' },
    { value: 'Freshers', label: 'Fresher Jobs', color: 'orange' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await axios.post(`${config.apiUrl}/job-alerts/subscribe`, {
        email,
        categories,
        frequency
      });
      
      setStatus('success');
      setMessage(response.data.message || 'Verification email sent! Check your inbox.');
      setEmail('');
      setCategories([]);
      setFrequency('daily');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  const toggleCategory = (value: string) => {
    setCategories(prev =>
      prev.includes(value)
        ? prev.filter(c => c !== value)
        : [...prev, value]
    );
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Bell className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Job Alerts</h3>
          <p className="text-sm text-gray-600">Get notified about new jobs</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-medium">{message}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm text-green-600 hover:text-green-700 underline"
          >
            Subscribe another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={status === 'loading'}
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Categories (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => toggleCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    categories.includes(cat.value)
                      ? `bg-${cat.color}-600 text-white`
                      : `bg-${cat.color}-50 text-${cat.color}-700 hover:bg-${cat.color}-100`
                  }`}
                  disabled={status === 'loading'}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert Frequency
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="daily"
                  checked={frequency === 'daily'}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Daily</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="weekly"
                  checked={frequency === 'weekly'}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Weekly</span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe to Job Alerts'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            We'll never spam you. Unsubscribe with one click.
          </p>
        </form>
      )}
    </div>
  );
}