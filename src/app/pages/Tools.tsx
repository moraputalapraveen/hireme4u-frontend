import { useState } from 'react';
import { 
  Wrench, FileText, Calculator, CheckSquare, 
  Sparkles, Download, Copy, RefreshCw, 
  Calendar, Target, TrendingUp, Award,
  BookOpen, Briefcase, Users, Clock
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  isPopular: boolean;
  isNew: boolean;
}

export function Tools() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resumeText, setResumeText] = useState('');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [salary, setSalary] = useState({ ctc: '', inHand: '' });
  const [interviewChecklist, setInterviewChecklist] = useState([
    { id: 1, text: 'Research company background', completed: false },
    { id: 2, text: 'Prepare answers for common questions', completed: false },
    { id: 3, text: 'Prepare questions to ask interviewer', completed: false },
    { id: 4, text: 'Print multiple copies of resume', completed: false },
    { id: 5, text: 'Plan your outfit', completed: false },
    { id: 6, text: 'Test your internet (for remote interviews)', completed: false },
    { id: 7, text: 'Prepare portfolio/work samples', completed: false },
    { id: 8, text: 'Know your interviewers', completed: false },
  ]);

  const tools: Tool[] = [
    {
      id: '1',
      name: 'Resume Builder',
      description: 'Create ATS-friendly resumes with professional templates',
      icon: FileText,
      category: 'resume',
      isPopular: true,
      isNew: false
    },
    {
      id: '2',
      name: 'Cover Letter Generator',
      description: 'Generate personalized cover letters in seconds',
      icon: Sparkles,
      category: 'resume',
      isPopular: true,
      isNew: true
    },
    {
      id: '3',
      name: 'Salary Calculator',
      description: 'Calculate in-hand salary from CTC and tax components',
      icon: Calculator,
      category: 'salary',
      isPopular: true,
      isNew: false
    },
    {
      id: '4',
      name: 'Interview Checklist',
      description: 'Track your interview preparation with interactive checklist',
      icon: CheckSquare,
      category: 'interview',
      isPopular: true,
      isNew: false
    },
    {
      id: '5',
      name: 'Skills Assessment',
      description: 'Evaluate your skills and get personalized learning recommendations',
      icon: Target,
      category: 'skills',
      isPopular: false,
      isNew: true
    },
    {
      id: '6',
      name: 'Notice Period Calculator',
      description: 'Calculate your last working day and join date',
      icon: Calendar,
      category: 'salary',
      isPopular: false,
      isNew: false
    },
    {
      id: '7',
      name: 'Job Search Tracker',
      description: 'Track applications, interviews, and follow-ups',
      icon: TrendingUp,
      category: 'tracker',
      isPopular: false,
      isNew: true
    },
    {
      id: '8',
      name: 'Career Path Finder',
      description: 'Discover career paths based on your skills and interests',
      icon: Award,
      category: 'skills',
      isPopular: false,
      isNew: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: Wrench },
    { id: 'resume', name: 'Resume & Cover Letter', icon: FileText },
    { id: 'interview', name: 'Interview Prep', icon: CheckSquare },
    { id: 'salary', name: 'Salary & Benefits', icon: Calculator },
    { id: 'skills', name: 'Skills & Career', icon: Target },
    { id: 'tracker', name: 'Trackers', icon: TrendingUp }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const calculateInHandSalary = () => {
    const ctc = parseFloat(salary.ctc);
    if (isNaN(ctc)) return;
    
    // Rough calculation: 80% of CTC for in-hand (after tax, PF, etc.)
    const inHand = (ctc * 0.8).toFixed(2);
    setSalary({ ...salary, inHand: `₹${inHand} LPA` });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const toggleChecklist = (id: number) => {
    setInterviewChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Career Tools - Resume Builder, Salary Calculator & More"
        description="Free tools to boost your job search: Resume builder, salary calculator, interview checklist, and career resources."
        keywords="career tools, resume builder, salary calculator, interview checklist, job search tools"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-12 h-12" />
            <h1 className="text-4xl font-bold">Career Tools</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Free tools and resources to accelerate your job search and career growth
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AdSense Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AdSenseSlot variant="banner" />
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={tool.id}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                      {tool.isNew && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      {tool.isPopular && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded">
                          POPULAR
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <button className="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm">
                    Launch Tool
                  </button>
                </div>
                {/* In-content Ad every 4 tools */}
                {(index + 1) % 4 === 0 && index !== filteredTools.length - 1 && (
                  <div className="my-6">
                    <AdSenseSlot variant="in-content" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Try Our Popular Tools</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Builder Preview */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Resume Builder</h3>
            </div>
            <p className="text-gray-600 mb-4">Paste your resume text to check ATS compatibility:</p>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume here..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Check ATS Score
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Salary Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Salary Calculator</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter CTC (in LPA)
                </label>
                <input
                  type="number"
                  value={salary.ctc}
                  onChange={(e) => setSalary({ ...salary, ctc: e.target.value })}
                  placeholder="e.g. 12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={calculateInHandSalary}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Calculate In-Hand Salary
              </button>
              {salary.inHand && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Estimated In-Hand Salary:</p>
                  <p className="text-2xl font-bold text-green-600">{salary.inHand}</p>
                  <p className="text-xs text-gray-500 mt-2">*Approximate, actual may vary based on deductions</p>
                </div>
              )}
            </div>
          </div>

          {/* Interview Checklist */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <CheckSquare className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Interview Preparation Checklist</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interviewChecklist.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    item.completed ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    item.completed ? 'bg-green-600 border-green-600' : 'border-gray-400'
                  }`}>
                    {item.completed && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <RefreshCw className="w-4 h-4" /> Reset
              </button>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-gray-100 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Interview Guides</h3>
              <p className="text-gray-600 text-sm mb-4">Company-specific interview experiences and tips</p>
              <button className="text-blue-600 font-medium hover:underline">Browse Guides →</button>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Company Reviews</h3>
              <p className="text-gray-600 text-sm mb-4">Read reviews from employees at top companies</p>
              <button className="text-blue-600 font-medium hover:underline">View Reviews →</button>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Mentorship</h3>
              <p className="text-gray-600 text-sm mb-4">Connect with industry experts for guidance</p>
              <button className="text-blue-600 font-medium hover:underline">Find a Mentor →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSenseSlot variant="sidebar" />
      </div>
    </div>
  );
}