import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, Briefcase, Users, TrendingUp, Clock, Eye, MousePointer, Award, BarChart3, Sparkles } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SEO } from '../components/SEO';
import axios from 'axios';
import config from '../../../config';
import { JobAlerts } from '../components/JobAlerts';

interface AnalyticsStats {
  totalViews: number;
  totalSearches: number;
  popularCategories: Array<{ name: string; count: number }>;
}

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs } = useJobs();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AnalyticsStats>({
    totalViews: 0,
    totalSearches: 0,
    popularCategories: []
  });
  const [isHovering, setIsHovering] = useState(false);

  // Track page view on component mount
  useEffect(() => {
    trackEvent('page_view', 'Home Page');
    fetchAnalyticsStats();
  }, []);

const trackEvent = async (eventType: string, eventData: string) => {
  try {
    // Only track allowed event types
    const allowedEvents = [
      'page_view', 
      'search', 
      'application_click', 
      'bookmark', 
      'share', 
      'category_click'
    ];
    
    if (!allowedEvents.includes(eventType)) {
      console.warn(`⚠️ Event type "${eventType}" not tracked (not in allowed list)`);
      return;
    }
    
    await axios.post(`${config.apiUrl}/api/analytics/track`, {
      eventType,
      eventData,
      url: window.location.pathname,
      timestamp: new Date()
    });
    console.log(`✅ Analytics tracked: ${eventType}`);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};
  const fetchAnalyticsStats = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/analytics/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await trackEvent('search', searchQuery);
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const latestJobs = jobs.slice(0, 6);
  
  const categories = [
    { name: 'IT Jobs', icon: Briefcase, count: jobs.filter(j => j.category === 'IT').length, path: '/jobs?category=IT', color: 'from-blue-500 to-blue-600' },
    { name: 'Non-IT Jobs', icon: Users, count: jobs.filter(j => j.category === 'Non-IT').length, path: '/jobs?category=Non-IT', color: 'from-green-500 to-green-600' },
    { name: 'Remote Jobs', icon: TrendingUp, count: jobs.filter(j => j.category === 'Remote').length, path: '/jobs?category=Remote', color: 'from-purple-500 to-purple-600' },
    { name: 'Fresher Jobs', icon: Clock, count: jobs.filter(j => j.isFresherFriendly).length, path: '/freshers', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SEO
        title="Hireme4u - Find Your Dream Job"
        description="Discover thousands of job opportunities for freshers and experienced developers. Browse IT, Non-IT, and Remote jobs from top companies across India."
        keywords="jobs, freshers jobs, developer jobs, IT jobs, remote jobs, careers, job search, employment opportunities, Hireme4u"
      />

      {/* Hero Section - Enhanced with Modern CSS */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-6 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Trusted by 10,000+ job seekers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
              Find Your Dream Job Today
            </h1>
            <p className="text-2xl text-blue-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Discover thousands of opportunities for freshers and experienced developers
            </p>
          </div>

          {/* Search Bar - Enhanced */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-16">
            <div 
              className={`flex flex-col md:flex-row gap-4 p-2 bg-white/10 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
                isHovering ? 'border-white/40 shadow-2xl scale-105' : 'border-white/20 shadow-xl'
              }`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title, company, or keyword..."
                  className="w-full pl-14 pr-6 py-5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg shadow-lg"
                />
              </div>
              <button
                type="submit"
                className="md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-10 py-5 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 focus:ring-4 focus:ring-yellow-300 shadow-lg text-lg"
              >
                Search Jobs
              </button>
            </div>
          </form>

          {/* Quick Stats - Enhanced with Icons and Animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-2xl">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="text-4xl font-bold mb-1">{jobs.length}+</div>
              <div className="text-blue-100 font-medium">Active Jobs</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-2xl">
              <Award className="w-12 h-12 mx-auto mb-3 text-green-300" />
              <div className="text-4xl font-bold mb-1">{jobs.filter(j => j.isFresherFriendly).length}+</div>
              <div className="text-blue-100 font-medium">Fresher Jobs</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-2xl">
              <Users className="w-12 h-12 mx-auto mb-3 text-purple-300" />
              <div className="text-4xl font-bold mb-1">50+</div>
              <div className="text-blue-100 font-medium">Companies</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-2xl">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-pink-300" />
              <div className="text-4xl font-bold mb-1">10k+</div>
              <div className="text-blue-100 font-medium">Applicants</div>
            </div>
          </div>

          {/* Analytics Stats - New Section */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <Eye className="w-6 h-6 mx-auto mb-2 text-blue-300" />
              <div className="text-xl font-bold">{stats.totalViews.toLocaleString()}+</div>
              <div className="text-xs text-blue-200 uppercase tracking-wider">Page Views</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <MousePointer className="w-6 h-6 mx-auto mb-2 text-green-300" />
              <div className="text-xl font-bold">{stats.totalSearches.toLocaleString()}+</div>
              <div className="text-xs text-blue-200 uppercase tracking-wider">Searches</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 md:col-span-1 col-span-2">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-purple-300" />
              <div className="text-xl font-bold">{stats.popularCategories.length}</div>
              <div className="text-xs text-blue-200 uppercase tracking-wider">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AdSenseSlot variant="banner" />
      </div>

      {/* Categories Section - Enhanced */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Browse by Category</h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Find your perfect role across various industries and experience levels
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={category.path}
                onClick={() => trackEvent('category_click', category.name)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 overflow-hidden hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-lg font-medium">{category.count} positions</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-blue-600 text-sm">Browse →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
    <div className="lg:col-span-1">
      <JobAlerts />
    </div>
  </div>
</section>

      {/* Featured Jobs Section - Enhanced */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white/50 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Job Openings</h2>
            <p className="text-xl text-gray-600">Recently posted opportunities for you</p>
          </div>
          
          <Link
            to="/jobs"
            className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
          >
            View All Jobs
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {latestJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-xl">No jobs available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

     

      {/* Why Choose Us Section - Enhanced */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Why Choose Hireme4u?
          </h2>
          <p className="text-xl text-gray-600 mb-16 text-center max-w-2xl mx-auto">
            We're committed to helping you find the perfect job opportunity
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group text-center p-8 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Quality Jobs</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Curated job listings from top companies across India, ensuring you find the best opportunities
              </p>
            </div>
            <div className="group text-center p-8 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Fresher Friendly</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Special focus on entry-level positions and internships for fresh graduates
              </p>
            </div>
            <div className="group text-center p-8 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Easy to Use</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Simple search and filter system to find your perfect job in minutes, not hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers who found their dream job through Hireme4u
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl text-lg"
            >
              Explore All Jobs
            </Link>
            <Link
              to="/admin"
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold hover:bg-white/10 transition-all transform hover:scale-105 text-lg"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Add custom CSS animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}