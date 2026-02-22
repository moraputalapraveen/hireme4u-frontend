import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, Bookmark, Share2 } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { toast } from 'sonner';

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

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { toggleBookmark, isBookmarked } = useJobs();
  const bookmarked = isBookmarked(job._id); // Use _id from MongoDB

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBookmark(job._id); // Use _id from MongoDB
    toast.success(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/jobs/${job.slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company}`,
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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
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
          <Link to={`/jobs/${job.slug}`}>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
              {job.title}
            </h3>
          </Link>
          <p className="text-gray-600 mt-1 font-medium">{job.company}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBookmark}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title={bookmarked ? 'Remove bookmark' : 'Bookmark job'}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Share job"
          >
            <Share2 className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{getTimeAgo(job.postedDate)}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between">
        <div>
          {job.salary && (
            <span className="text-green-600 font-semibold">{job.salary}</span>
          )}
          <span className="text-gray-500 text-sm ml-2">• {job.experienceLevel}</span>
        </div>
        <Link
          to={`/jobs/${job.slug}`}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}