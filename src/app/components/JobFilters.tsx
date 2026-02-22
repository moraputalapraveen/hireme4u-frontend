import { Filter } from 'lucide-react';

export interface FilterOptions {
  category: string;
  jobType: string;
  experienceLevel: string;
  location: string;
  datePosted: string;
  isFresherFriendly: boolean;
  // search is handled separately, not in filters
}

interface JobFiltersProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

export function JobFilters({ filters, onChange }: JobFiltersProps) {
  const handleFilterChange = (key: keyof FilterOptions, value: string | boolean) => {
    onChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onChange({
      category: '',
      jobType: '',
      experienceLevel: '',
      location: '',
      datePosted: '',
      isFresherFriendly: false
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {/* Date Posted */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Posted
          </label>
          <select
            value={filters.datePosted}
            onChange={(e) => handleFilterChange('datePosted', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="3days">Last 3 Days</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={filters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={filters.experienceLevel}
            onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1 years">0-1 Years</option>
            <option value="1-3 years">1-3 Years</option>
            <option value="3-5 years">3-5 Years</option>
            <option value="5+ years">5+ Years</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="IT">IT</option>
            <option value="Non-IT">Non-IT</option>
            <option value="Remote">Remote</option>
            <option value="Freshers">Freshers</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            placeholder="e.g. Bangalore, Mumbai..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Fresher Friendly Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="fresherFriendly"
            checked={filters.isFresherFriendly}
            onChange={(e) => handleFilterChange('isFresherFriendly', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="fresherFriendly" className="ml-2 text-sm text-gray-700">
            Fresher Friendly Jobs Only
          </label>
        </div>
      </div>
    </div>
  );
}