import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, DollarSign, ExternalLink, ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SEO } from '../components/SEO';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';

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

export function JobDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useJobs();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobDetails();
  }, [slug]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/jobs/${slug}`);
      
      if (response.data.success) {
        setJob(response.data.job);
      } else {
        setError('Job not found');
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const bookmarked = job ? isBookmarked(job._id) : false;

  const handleBookmark = () => {
    if (job) {
      toggleBookmark(job._id);
      toast.success(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: `Check out this job: ${job?.title} at ${job?.company}`,
          url: url
        });
      } catch (error) {}
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 3) return `${diffDays} days ago`;
    if (diffDays <= 7) return '1 week ago';
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <SEO title="Job Not Found" description="The job you're looking for doesn't exist." />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The job you\'re looking for doesn\'t exist.'}</p>
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${job.title} at ${job.company}`}
        description={`${job.description.substring(0, 150)}... Apply now for ${job.title} position at ${job.company} in ${job.location}.`}
      />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {job.isFresherFriendly && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                    Fresher Friendly
                  </span>
                )}
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                  {job.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-700 font-medium mb-4">{job.company}</p>
              
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.jobType}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {getTimeAgo(job.postedDate)}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-5 h-5" />
                    <span>{job.salary}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBookmark}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
                {bookmarked ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdSenseSlot variant="banner" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              {/* Job Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </section>

              {/* In-content Ad */}
              <div className="my-8">
                <AdSenseSlot variant="in-content" />
              </div>

              {/* Requirements */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* About Company */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {job.company}</h2>
                <p className="text-gray-700 leading-relaxed">{job.companyDescription}</p>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Job Overview */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Job Overview</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Experience Level</p>
                    <p className="font-medium text-gray-900">{job.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Job Type</p>
                    <p className="font-medium text-gray-900">{job.jobType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="font-medium text-gray-900">{job.category}</p>
                  </div>
                  {job.salary && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                      <p className="font-medium text-gray-900">{job.salary}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Posted Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(job.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar Ad */}
              <AdSenseSlot variant="sidebar" />

              {/* Apply Button */}
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Apply for this Position
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}