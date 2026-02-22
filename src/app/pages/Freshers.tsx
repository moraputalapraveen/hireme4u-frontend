import { useState, useMemo } from 'react';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { SearchBar } from '../components/SearchBar';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { GraduationCap } from 'lucide-react';

export function Freshers() {
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');

  const fresherJobs = useMemo(() => {
    const filtered = jobs.filter(
      (job) => job.isFresherFriendly || job.experienceLevel === 'Fresher' || job.experienceLevel === '0-1 years'
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [jobs, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Jobs for Freshers</h1>
          </div>
          <p className="text-xl text-green-100">
            Kickstart your career with these entry-level opportunities
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search fresher jobs by title, company, or location..."
          />
        </div>
      </div>

      {/* AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdSenseSlot variant="banner" />
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{fresherJobs.length}</span> fresher-friendly job
            {fresherJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {fresherJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No fresher jobs found.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fresherJobs.map((job, index) => (
              <div key={job.id}>
                <JobCard job={job} />
                {/* In-content Ad every 6 jobs */}
                {(index + 1) % 6 === 0 && index !== fresherJobs.length - 1 && (
                  <div className="col-span-full my-6">
                    <AdSenseSlot variant="in-content" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tips for Freshers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Build Your Resume</h3>
              <p className="text-gray-600">
                Create a professional resume highlighting your skills, education, and projects
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Apply Regularly</h3>
              <p className="text-gray-600">
                Don't wait for the perfect job. Apply to multiple positions to increase your chances
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Prepare Well</h3>
              <p className="text-gray-600">
                Research the company and practice common interview questions before applying
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
