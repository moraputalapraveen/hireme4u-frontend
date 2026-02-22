import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, Tag, ArrowRight, Search, Clock, Eye, ThumbsUp } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
}

export function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '10 Essential Tips for Acing Your First Job Interview',
      excerpt: 'Landing your first job interview is exciting and nerve-wracking. Here are proven strategies to make a lasting impression.',
      content: 'Full content here...',
      author: 'Priya Sharma',
      authorRole: 'Senior HR Manager',
      date: '2026-02-20',
      readTime: '8 min read',
      category: 'Interview Tips',
      tags: ['interview', 'freshers', 'career tips'],
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 1542,
      likes: 89
    },
    {
      id: '2',
      title: 'How to Build a Standout Resume as a Fresher',
      excerpt: 'No experience? No problem! Learn how to highlight your skills, projects, and internships to create an impressive resume.',
      content: 'Full content here...',
      author: 'Rahul Verma',
      authorRole: 'Career Coach',
      date: '2026-02-18',
      readTime: '6 min read',
      category: 'Resume Writing',
      tags: ['resume', 'freshers', 'job search'],
      image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 2341,
      likes: 156
    },
    {
      id: '3',
      title: 'Top 5 In-Demand Tech Skills for 2026',
      excerpt: 'Stay ahead of the curve with these emerging technologies that companies are hiring for right now.',
      content: 'Full content here...',
      author: 'Ankit Patel',
      authorRole: 'Tech Recruiter',
      date: '2026-02-15',
      readTime: '5 min read',
      category: 'Career Advice',
      tags: ['tech skills', 'trends', 'learning'],
      image: 'https://images.unsplash.com/photo-1555066937-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 3245,
      likes: 203
    },
    {
      id: '4',
      title: 'Remote Work: How to Stay Productive and Visible',
      excerpt: 'Working remotely? Learn strategies to stay productive, communicate effectively, and advance your career.',
      content: 'Full content here...',
      author: 'Neha Gupta',
      authorRole: 'Remote Work Specialist',
      date: '2026-02-12',
      readTime: '7 min read',
      category: 'Remote Work',
      tags: ['remote', 'WFH', 'productivity'],
      image: 'https://images.unsplash.com/photo-1598256989803-fe4f8dac9b3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 1876,
      likes: 112
    },
    {
      id: '5',
      title: 'Negotiating Your First Salary: A Fresher\'s Guide',
      excerpt: 'Afraid to negotiate your first offer? Here\'s how to confidently discuss salary without experience.',
      content: 'Full content here...',
      author: 'Vikram Singh',
      authorRole: 'Salary Negotiation Expert',
      date: '2026-02-10',
      readTime: '6 min read',
      category: 'Salary Tips',
      tags: ['salary', 'negotiation', 'freshers'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 2134,
      likes: 167
    },
    {
      id: '6',
      title: 'Switching Careers: A Guide for Non-IT Professionals',
      excerpt: 'Thinking of moving into tech from a non-IT background? Here\'s your roadmap to success.',
      content: 'Full content here...',
      author: 'Deepika Reddy',
      authorRole: 'Career Counselor',
      date: '2026-02-08',
      readTime: '9 min read',
      category: 'Career Change',
      tags: ['career change', 'non-IT', 'upskilling'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      views: 987,
      likes: 78
    }
  ];

  const categories = ['all', 'Interview Tips', 'Resume Writing', 'Career Advice', 'Remote Work', 'Salary Tips', 'Career Change'];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Career Blog - Tips & Advice for Job Seekers"
        description="Expert advice on interviews, resume writing, career growth, and job search strategies for freshers and professionals."
        keywords="career blog, job search tips, interview advice, resume writing, career guidance"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Career Blog</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Expert advice, tips, and insights to help you succeed in your job search and career growth
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AdSenseSlot variant="banner" />
      </div>

      {/* Featured Post */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-2/5 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${featuredPost.image})` }}></div>
              <div className="p-8 md:w-3/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600">
                  <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=${featuredPost.author.replace(' ', '+')}&background=blue&color=fff)` }}></div>
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500">{featuredPost.authorRole}</p>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`} className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
        
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div key={post.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
                    <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent p-4 flex items-end">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=${post.author.replace(' ', '+')}&background=blue&color=fff&size=32)` }}></div>
                        <span className="text-sm font-medium text-gray-900">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.views}</span>
                        <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* In-content Ad every 3 posts */}
                {(index + 1) % 3 === 0 && index !== filteredPosts.length - 1 && (
                  <div className="my-6">
                    <AdSenseSlot variant="in-content" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Career Tips in Your Inbox</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive weekly job search strategies and career advice.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}