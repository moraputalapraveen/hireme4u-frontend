import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { SearchBar } from '../components/SearchBar';
import { JobFilters, FilterOptions } from '../components/JobFilters';
import { AdSenseSlot } from '../components/AdSenseSlot';
import axios from 'axios';
import config from '../../../config';

const API_URL = config.apiUrl;

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
  companyDescription: string;
  isFresherFriendly: boolean;
  slug: string;
  postedDate: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading: contextLoading } = useJobs();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1
  });

  // Get filter values from URL
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || '',
    jobType: searchParams.get('jobType') || '',
    experienceLevel: searchParams.get('experienceLevel') || '',
    location: searchParams.get('location') || '',
    datePosted: searchParams.get('datePosted') || '',
    isFresherFriendly: searchParams.get('isFresherFriendly') === 'true'
  });

  // Fetch jobs from backend with filters
  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Build query string from filters
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filters.category) params.append('category', filters.category);
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
      if (filters.location) params.append('location', filters.location);
      if (filters.datePosted) params.append('datePosted', filters.datePosted);
      if (filters.isFresherFriendly) params.append('isFresherFriendly', 'true');
      params.append('page', pagination.page.toString());
      params.append('limit', '10');

      const response = await axios.get(`${config.apiUrl}/jobs`);
      
      if (response.data.success) {
        setJobs(response.data.jobs);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (filters.category) params.append('category', filters.category);
    if (filters.jobType) params.append('jobType', filters.jobType);
    if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
    if (filters.location) params.append('location', filters.location);
    if (filters.datePosted) params.append('datePosted', filters.datePosted);
    if (filters.isFresherFriendly) params.append('isFresherFriendly', 'true');
    
    setSearchParams(params);
  }, [filters, searchQuery, setSearchParams]);

  // Fetch jobs when filters, search, or page changes
  useEffect(() => {
    fetchJobs();
  }, [filters, searchQuery, pagination.page]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on filter change
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo(0, 0);
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Job Openings</h1>
          <SearchBar 
            value={searchQuery} 
            onChange={handleSearch} 
          />
        </div>
      </div>

      {/* AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdSenseSlot variant="banner" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <JobFilters 
                filters={filters} 
                onChange={handleFilterChange} 
              />
              <div className="mt-6">
                <AdSenseSlot variant="sidebar" />
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{jobs.length}</span> of{' '}
                <span className="font-semibold">{pagination.total}</span> jobs
              </p>
            </div>

            {jobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {jobs.map((job, index) => (
                    <div key={job._id}>
                      <JobCard job={job} />
                      {(index + 1) % 4 === 0 && index !== jobs.length - 1 && (
                        <div className="my-6">
                          <AdSenseSlot variant="in-content" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 border rounded-lg ${
                          pagination.page === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}