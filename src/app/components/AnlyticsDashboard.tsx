import { useState, useEffect } from 'react';
import { 
  Users, Eye, Clock, Activity, Globe, 
  Monitor, Smartphone, Tablet, Calendar,
  UserPlus, UserCheck
} from 'lucide-react';
import AnalyticsService, { AnalyticsData } from '../services/AnalyticsService';

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(data,'data')

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const dashboardData = await AnalyticsService.getDashboardData();
      console.log('Dashboard data received:', dashboardData);
      setData(dashboardData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-700">No analytics data available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
          <div>
            <Activity className="w-8 h-8 opacity-50 mb-2" />
            <p className="text-4xl font-bold">{data.activeNow}</p>
            <p className="text-green-100">Active Now</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div>
            <Calendar className="w-8 h-8 opacity-50 mb-2" />
            <p className="text-4xl font-bold">{data.todayVisits}</p>
            <p className="text-blue-100">Today's Visits</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <div>
            <Clock className="w-8 h-8 opacity-50 mb-2" />
            <p className="text-4xl font-bold">{data.avgTimeOnSite}</p>
            <p className="text-purple-100">Avg. Time on Site</p>
          </div>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{data.totalPageViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unique Visitors</p>
              <p className="text-2xl font-bold text-purple-600">{data.totalVisitors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">New Visitors</p>
              <p className="text-2xl font-bold text-green-600">{data.newVisitors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Returning</p>
              <p className="text-2xl font-bold text-orange-600">{data.returningVisitors}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Stats Table */}
      {data.dailyStats && data.dailyStats.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Views</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Visitors</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">New</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.dailyStats.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{day.date}</td>
                    <td className="px-4 py-2 text-sm font-medium text-blue-600">{day.views}</td>
                    <td className="px-4 py-2 text-sm font-medium text-purple-600">{day.visitors}</td>
                    <td className="px-4 py-2 text-sm font-medium text-green-600">{day.newVisitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500 text-center">No daily data available</p>
        </div>
      )}

      {/* Device Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Devices</h2>
          {data.devices ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Desktop</span>
                  <span className="text-sm font-medium">{data.devices.desktop}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(data.devices.desktop / data.totalPageViews) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Mobile</span>
                  <span className="text-sm font-medium">{data.devices.mobile}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(data.devices.mobile / data.totalPageViews) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Tablet</span>
                  <span className="text-sm font-medium">{data.devices.tablet}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(data.devices.tablet / data.totalPageViews) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No device data available</p>
          )}
        </div>

        {/* Top Referrers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Referrers</h2>
          {data.topReferrers && data.topReferrers.length > 0 ? (
            <div className="space-y-3">
              {data.topReferrers.map((ref, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-700 truncate max-w-xs">{ref.source}</span>
                  <span className="text-sm font-semibold text-blue-600">{ref.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No referrer data yet</p>
          )}
        </div>
      </div>

      {/* Top Countries */}
      {data.topCountries && data.topCountries.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Top Countries
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.topCountries.map((country, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between">
                <span className="text-sm">{country.country || 'Unknown'}</span>
                <span className="text-sm font-semibold text-blue-600">{country.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}