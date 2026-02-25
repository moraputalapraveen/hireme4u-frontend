import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { toast } from 'sonner';
import { Plus, LogIn } from 'lucide-react';
import { BulkUpload } from '../components/BluckUpload';

// Secret URL pattern - change this to your preferred secret
const SECRET_PATH = '/admin/secret123';

export function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addJob, adminLogin, isAdminLoggedIn, adminLogout } = useJobs();
  const [isLogin, setIsLogin] = useState(!isAdminLoggedIn());
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    applyLink: '',
    category: 'IT',
    jobType: 'Full-time',
    experienceLevel: 'Fresher',
    companyDescription: '',
  });

  // Check if user is accessing via secret URL
  useEffect(() => {
    // If at secret URL, show login
    if (location.pathname === SECRET_PATH) {
      setIsLogin(true);
    }
    
    // If logged in, show post form
    if (isAdminLoggedIn()) {
      setIsLogin(false);
    }
  }, [location, isAdminLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      const result = await adminLogin(loginData.username, loginData.password);
      
      if (result && result.success) {
        toast.success('Login successful!');
        // Redirect to admin panel after login
        navigate('/admin');
      } else {
        toast.error(result?.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    adminLogout();
    setIsLogin(true);
    toast.success('Logged out');
    // Redirect to secret login page
    navigate(SECRET_PATH);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.applyLink.startsWith('http')) {
      toast.error('Apply link must be a valid URL starting with http:// or https://');
      return;
    }

    // Parse requirements
    const requirementsArray = formData.requirements
      .split('\n')
      .filter((req) => req.trim() !== '')
      .map((req) => req.trim());

    if (requirementsArray.length === 0) {
      toast.error('Please add at least one requirement');
      return;
    }

    try {
      // Prepare job data
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        description: formData.description,
        requirements: requirementsArray,
        salary: formData.salary || undefined,
        applyLink: formData.applyLink,
        category: formData.category,
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        companyDescription: formData.companyDescription || `${formData.company} is hiring through HireMe4U.`,
      };

      console.log('Submitting job:', jobData); // Debug log

      const newJob = await addJob(jobData);
      
      if (newJob) {
        toast.success('Job posted successfully!');
        
        // Reset form
        setFormData({
          title: '',
          company: '',
          location: '',
          description: '',
          requirements: '',
          salary: '',
          applyLink: '',
          category: 'IT',
          jobType: 'Full-time',
          experienceLevel: 'Fresher',
          companyDescription: '',
        });

        // Navigate to the new job
        if (newJob.slug) {
          setTimeout(() => {
            navigate(`/jobs/${newJob.slug}`);
          }, 1000);
        } else {
          navigate('/jobs');
        }
      }
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast.error(error?.message || 'Failed to post job. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Login Screen - only shown at secret URL
  if (isLogin && location.pathname === SECRET_PATH) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <LogIn className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            </div>
              <div className="mt-8">
              </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Login
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              This area is for authorized admins only
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If trying to access /admin without login, redirect to secret login
  if (!isAdminLoggedIn() && location.pathname === '/admin') {
    navigate(SECRET_PATH);
    return null;
  }

  // Post Job Form - only for logged in admins at /admin
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BulkUpload />

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Plus className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. React Developer"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. TechCorp Solutions"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Bangalore, India or Remote"
              />
            </div>

            {/* Category, Job Type, Experience Level - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="IT">IT</option>
                  <option value="Non-IT">Non-IT</option>
                  <option value="Remote">Remote</option>
                  <option value="Freshers">Freshers</option>
                </select>
              </div>

              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="0-1 years">0-1 Years</option>
                  <option value="1-3 years">1-3 Years</option>
                  <option value="3-5 years">3-5 Years</option>
                  <option value="5+ years">5+ Years</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range (Optional)
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. ₹4-8 LPA"
              />
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide a detailed description of the job role..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter each requirement on a new line..."
              />
              <p className="text-sm text-gray-500 mt-1">Enter each requirement on a new line</p>
            </div>

            {/* Company Description */}
            <div>
              <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-2">
                About Company (Optional)
              </label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide information about the company..."
              />
            </div>

            {/* Apply Link */}
            <div>
              <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700 mb-2">
                Apply Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="applyLink"
                name="applyLink"
                value={formData.applyLink}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/apply"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Post Job
              </button>
              <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}