import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { SEO } from '../components/SEO';

export function CategoryJobs() {
  const { category, location } = useParams();
  const { jobs } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    let filtered = jobs;
    
    if (category) {
      filtered = filtered.filter(j => 
        j.category.toLowerCase() === category.toLowerCase() ||
        j.title.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (location && location !== 'remote') {
      filtered = filtered.filter(j => 
        j.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (location === 'remote') {
      filtered = filtered.filter(j => j.jobType === 'Remote');
    }
    
    setFilteredJobs(filtered);
  }, [category, location, jobs]);

  const pageTitle = `${category} Jobs ${location ? `in ${location}` : ''} | HireMe4U`;
  const pageDescription = `Find the best ${category} jobs ${location ? `in ${location}` : ''}. Apply to ${filteredJobs.length}+ openings with salary insights and company reviews.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title={pageTitle} description={pageDescription} />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900">
            {category} Jobs {location && `in ${location}`}
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredJobs.length} jobs available • Updated daily
          </p>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}