import { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import { 
  Users, Eye, MousePointer, Globe, 
  Smartphone, Laptop, BarChart3, Calendar,
  ArrowUp, ArrowDown, Download, RefreshCw
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import config from '../../../config';


const API_URL = config.apiUrl

interface Stats {
  total: number;
  unique: number;
  byDay: Array<{ _id: string; count: number }>;
  byPage: Array<{ _id: string; count: number }>;
  byDevice: Array<{ _id: string; count: number }>;
  byBrowser: Array<{ _id: string; count: number }>;
  topReferrers: Array<{ _id: string; count: number }>;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7d');
  const { isAdminLoggedIn } = useJobs();

  useEffect(() => {
    if (isAdminLoggedIn()) {
      fetchStats();
    }
  }, [period, isAdminLoggedIn]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/visitor/stats?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.stats);
    } catch (error) {
      toast.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdminLoggedIn()) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Visitor Analytics</h1>
          <div className="flex gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
            <button
              onClick={fetchStats}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.total.toLocaleString()}</h3>
            <p className="text-gray-600">Visits</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Unique</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.unique.toLocaleString()}</h3>
            <p className="text-gray-600">Visitors</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Laptop className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Desktop</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats?.byDevice.find(d => d._id === 'desktop')?.count.toLocaleString() || 0}
            </h3>
            <p className="text-gray-600">Visits</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Smartphone className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Mobile</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats?.byDevice.find(d => d._id === 'mobile')?.count.toLocaleString() || 0}
            </h3>
            <p className="text-gray-600">Visits</p>
          </div>
        </div>

        {/* Chart and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Visitors Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Visitors</h2>
            <div className="space-y-2">
              {stats?.byDay.slice(-7).map((day) => (
                <div key={day._id} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-24">{day._id}</span>
                  <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ 
                        width: `${(day.count / Math.max(...stats.byDay.map(d => d.count))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-16">{day.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Most Visited Pages</h2>
            <div className="space-y-3">
              {stats?.byPage.map((page) => (
                <div key={page._id} className="flex items-center justify-between">
                  <span className="text-gray-700">{page._id || 'Home'}</span>
                  <span className="font-semibold text-blue-600">{page.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Browsers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Browsers</h2>
            <div className="space-y-3">
              {stats?.byBrowser.map((browser) => (
                <div key={browser._id} className="flex items-center justify-between">
                  <span className="text-gray-700">{browser._id}</span>
                  <span className="font-semibold text-green-600">{browser.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Referrers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Referrers</h2>
            <div className="space-y-3">
              {stats?.topReferrers.map((referrer) => (
                <div key={referrer._id} className="flex items-center justify-between">
                  <span className="text-gray-700 truncate max-w-xs">{referrer._id}</span>
                  <span className="font-semibold text-purple-600">{referrer.count}</span>
                </div>
              ))}
              {stats?.topReferrers.length === 0 && (
                <p className="text-gray-500">No external referrers yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}