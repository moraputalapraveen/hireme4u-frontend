import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { 
  Users, Eye, MousePointer, Globe, 
  Smartphone, Laptop, BarChart3, Calendar,
  ArrowUp, ArrowDown, Download, RefreshCw,
  Edit, Trash2, Search, Plus, X, Save,
  Briefcase, CheckCircle, XCircle, Filter
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import config from '../../../config';

const API_URL = config.apiUrl;

interface Stats {
  total: number;
  unique: number;
  byDay: Array<{ _id: string; count: number }>;
  byPage: Array<{ _id: string; count: number }>;
  byDevice: Array<{ _id: string; count: number }>;
  byBrowser: Array<{ _id: string; count: number }>;
  topReferrers: Array<{ _id: string; count: number }>;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  applyLink: string;
  category: string;
  jobType: string;
  experienceLevel: string;
  isFresherFriendly: boolean;
  postedDate: string;
  slug?: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useJobs();
  
  // Analytics state
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7d');
  
  // Job management state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'jobs'>('analytics');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/secret123');
      return;
    }
    fetchStats();
    fetchJobs();
  }, [isAdminLoggedIn, navigate]);

  useEffect(() => {
    if (activeTab === 'analytics') {
      fetchStats();
    } else if (activeTab === 'jobs') {
      fetchJobs();
    }
  }, [period, activeTab]);

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

  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setJobsLoading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setJobs(prev => prev.filter(job => job._id !== jobId));
      toast.success('Job deleted successfully');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const handleUpdate = async (updatedJob: Job) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(
        `${API_URL}/admin/jobs/${updatedJob._id}`,
        updatedJob,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setJobs(prev => prev.map(job => 
        job._id === updatedJob._id ? response.data.job : job
      ));
      toast.success('Job updated successfully');
      setShowEditModal(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const getExperienceColor = (level: string) => {
    if (level.includes('Fresher')) return 'bg-green-100 text-green-700';
    if (level.includes('0-1')) return 'bg-blue-100 text-blue-700';
    if (level.includes('1-3')) return 'bg-yellow-100 text-yellow-700';
    if (level.includes('3-5')) return 'bg-orange-100 text-orange-700';
    return 'bg-purple-100 text-purple-700';
  };

  if (!isAdminLoggedIn()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Tabs */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
            <button
              onClick={() => navigate('/admin/email')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Email Subscribers
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium text-lg transition-colors ${
              activeTab === 'analytics'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <BarChart3 className="w-5 h-5 inline mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-medium text-lg transition-colors ${
              activeTab === 'jobs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Briefcase className="w-5 h-5 inline mr-2" />
            Manage Jobs ({jobs.length})
          </button>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            {/* Period Selector */}
            <div className="flex justify-end mb-6">
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

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          </>
        )}

        {/* Jobs Management Tab */}
        {activeTab === 'jobs' && (
          <>
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search jobs by title, company, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobsLoading ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : currentJobs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          No jobs found
                        </td>
                      </tr>
                    ) : (
                      currentJobs.map((job) => (
                        <tr key={job._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            {job.isFresherFriendly && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                                Fresher Friendly
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {job.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getExperienceColor(job.experienceLevel)}`}>
                              {job.experienceLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(job.postedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate(`/jobs/${job.slug || job._id}`)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingJob(job);
                                  setShowEditModal(true);
                                }}
                                className="p-1 text-green-600 hover:bg-green-50 rounded-lg"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {deleteConfirm === job._id ? (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleDelete(job._id)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                                    title="Confirm Delete"
                                  >
                                    ✓
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg"
                                    title="Cancel"
                                  >
                                    ✗
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(job._id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Export Button (visible in analytics tab) */}
        {activeTab === 'analytics' && (
          <div className="mt-8 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5" />
              Export Data
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Edit Job</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingJob(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingJob);
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
                  <input
                    type="text"
                    value={editingJob.company}
                    onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                <input
                  type="text"
                  value={editingJob.location}
                  onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line)</label>
                <textarea
                  value={editingJob.requirements.join('\n')}
                  onChange={(e) => setEditingJob({ 
                    ...editingJob, 
                    requirements: e.target.value.split('\n').filter(r => r.trim())
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingJob.category}
                    onChange={(e) => setEditingJob({ ...editingJob, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="IT">IT</option>
                    <option value="Non-IT">Non-IT</option>
                    <option value="Remote">Remote</option>
                    <option value="Freshers">Freshers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select
                    value={editingJob.jobType}
                    onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <select
                    value={editingJob.experienceLevel}
                    onChange={(e) => setEditingJob({ ...editingJob, experienceLevel: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary (optional)</label>
                <input
                  type="text"
                  value={editingJob.salary || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                  placeholder="e.g. ₹6-10 LPA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link*</label>
                <input
                  type="url"
                  value={editingJob.applyLink}
                  onChange={(e) => setEditingJob({ ...editingJob, applyLink: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fresherFriendly"
                  checked={editingJob.isFresherFriendly}
                  onChange={(e) => setEditingJob({ ...editingJob, isFresherFriendly: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="fresherFriendly" className="ml-2 text-sm text-gray-700">
                  Fresher Friendly
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingJob(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}