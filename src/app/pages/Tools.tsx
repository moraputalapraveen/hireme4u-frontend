import { useState, useRef } from 'react';
import { 
  FileText, Upload, CheckCircle, AlertCircle,
  Sparkles, Download, Copy, XCircle
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { toast } from 'sonner';

interface ATSScore {
  overall: number;
  keywords: { found: string[]; missing: string[] };
  formatting: number;
  experience: number;
  education: number;
  skills: number;
  suggestions: string[];
}

export function Tools() {
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Industry keywords for ATS detection
  const industryKeywords = [
    'javascript', 'python', 'java', 'react', 'node', 'sql', 'mongodb',
    'aws', 'docker', 'kubernetes', 'machine learning', 'data analysis',
    'project management', 'agile', 'scrum', 'leadership', 'communication',
    'teamwork', 'problem solving', 'critical thinking', 'time management',
    'html', 'css', 'typescript', 'git', 'rest api', 'graphql',
    'mysql', 'postgresql', 'firebase', 'azure', 'devops', 'ci/cd',
    'testing', 'jest', 'cypress', 'frontend', 'backend', 'full stack'
  ];

  const calculateATSScore = () => {
    if (!resumeText && !resumeFile) {
      toast.error('Please paste your resume or upload a file');
      return;
    }

    let text = resumeText;
    
    if (!text && resumeFile) {
      toast.info('File uploaded. Please paste the text content for accurate analysis.');
      return;
    }

    if (!text) {
      toast.error('Please enter resume text');
      return;
    }

    setLoading(true);
    
    // Simulate analysis (in production, this would be more sophisticated)
    setTimeout(() => {
      const textLower = text.toLowerCase();

      // Keyword analysis
      const foundKeywords: string[] = [];
      const missingKeywords: string[] = [];

      industryKeywords.forEach(keyword => {
        if (textLower.includes(keyword.toLowerCase())) {
          foundKeywords.push(keyword);
        } else {
          missingKeywords.push(keyword);
        }
      });

      // Formatting score
      let formattingScore = 60;
      if (text.includes('•') || text.includes('-')) formattingScore += 10;
      if (text.split('\n').length > 15) formattingScore += 10;
      if (text.length > 1000 && text.length < 3000) formattingScore += 20;
      
      // Experience score
      let experienceScore = 50;
      const expMatch = text.match(/(\d+)\+?\s*years?/g);
      if (expMatch) experienceScore += 20;
      if (text.includes('internship') || text.includes('intern')) experienceScore += 15;
      if (text.includes('worked on') || text.includes('developed')) experienceScore += 15;

      // Education score
      let educationScore = 60;
      if (text.includes('bachelor') || text.includes('b.tech') || text.includes('b.e')) educationScore += 15;
      if (text.includes('master') || text.includes('m.tech') || text.includes('m.e')) educationScore += 15;
      if (text.includes('certification')) educationScore += 10;

      // Skills score based on keyword density
      let skillsScore = Math.min(100, foundKeywords.length * 3);

      // Calculate overall score
      const overall = Math.min(100, Math.round(
        (foundKeywords.length * 2) + 
        (formattingScore * 0.2) + 
        (experienceScore * 0.2) + 
        (educationScore * 0.2) + 
        (skillsScore * 0.3)
      ));

      // Generate suggestions
      const suggestions: string[] = [];
      if (overall < 70) {
        suggestions.push('Add more industry-specific keywords from job descriptions');
      }
      if (missingKeywords.length > 5) {
        suggestions.push(`Include keywords like: ${missingKeywords.slice(0, 5).join(', ')}`);
      }
      if (formattingScore < 80) {
        suggestions.push('Use bullet points and clear section headings for better readability');
      }
      if (!text.includes('•') && !text.includes('-')) {
        suggestions.push('Add bullet points to highlight achievements');
      }
      if (!text.match(/\d+%/)) {
        suggestions.push('Quantify achievements with percentages and numbers');
      }
      if (text.length < 1000) {
        suggestions.push('Your resume seems short - add more details about your experience');
      }
      if (text.length > 4000) {
        suggestions.push('Your resume is too long - aim for 1-2 pages');
      }
      suggestions.push('Tailor your resume for each job application');

      setAtsScore({
        overall,
        keywords: { found: foundKeywords.slice(0, 15), missing: missingKeywords.slice(0, 10) },
        formatting: Math.min(100, formattingScore),
        experience: Math.min(100, experienceScore),
        education: Math.min(100, educationScore),
        skills: Math.min(100, skillsScore),
        suggestions
      });

      setLoading(false);
      toast.success('ATS Analysis Complete!');
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setResumeText(content);
      toast.success('File loaded! Click "Check ATS Score" to analyze.');
    };
    reader.readAsText(file);
  };

  const resetAnalysis = () => {
    setResumeText('');
    setResumeFile(null);
    setAtsScore(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! Your resume is highly ATS-friendly';
    if (score >= 60) return 'Good, but could be optimized further';
    return 'Needs improvement to pass ATS filters';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <SEO
        title="Free ATS Resume Checker - HireMe4U"
        description="Check your resume's ATS compatibility score instantly. Get keyword analysis and optimization tips."
        keywords="ATS resume checker, resume score, keyword analysis, resume optimization"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-4">ATS Resume Checker</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Find out if your resume passes Applicant Tracking Systems before recruiters see it
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.doc,.docx,.pdf"
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-2">Upload your resume</p>
                <p className="text-sm text-gray-500 mb-4">Supports TXT, DOC, DOCX, PDF</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Choose File
                </button>
                {resumeFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {resumeFile.name}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or paste your resume text
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  placeholder="Copy and paste your resume content here..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={calculateATSScore}
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? 'Analyzing...' : 'Check ATS Score'}
                </button>
                <button
                  onClick={resetAnalysis}
                  className="px-6 py-4 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="bg-gray-50 rounded-xl p-6">
              {!atsScore ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <FileText className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">Your ATS score will appear here</p>
                  <p className="text-sm mt-2">Upload your resume and click "Check ATS Score"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className={`text-7xl font-bold mb-2 ${getScoreColor(atsScore.overall)}`}>
                      {atsScore.overall}%
                    </div>
                    <p className="text-gray-600">{getScoreMessage(atsScore.overall)}</p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Score Breakdown</h3>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Keywords Match</span>
                        <span className={getScoreColor(atsScore.skills)}>{atsScore.skills}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBg(atsScore.skills)}`}
                          style={{ width: `${atsScore.skills}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Formatting</span>
                        <span className={getScoreColor(atsScore.formatting)}>{atsScore.formatting}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBg(atsScore.formatting)}`}
                          style={{ width: `${atsScore.formatting}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Experience</span>
                        <span className={getScoreColor(atsScore.experience)}>{atsScore.experience}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBg(atsScore.experience)}`}
                          style={{ width: `${atsScore.experience}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Education</span>
                        <span className={getScoreColor(atsScore.education)}>{atsScore.education}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBg(atsScore.education)}`}
                          style={{ width: `${atsScore.education}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Keywords Found */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Keywords Found ({atsScore.keywords.found.length})
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {atsScore.keywords.found.map(keyword => (
                        <span key={keyword} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-3">
                      Missing Keywords ({atsScore.keywords.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {atsScore.keywords.missing.map(keyword => (
                        <span key={keyword} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 rounded-lg p-5">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Optimization Tips
                    </h4>
                    <ul className="space-y-2">
                      {atsScore.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(atsScore, null, 2));
                        toast.success('Results copied to clipboard');
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Results
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AdSenseSlot variant="banner" />
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why ATS Optimization Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">75% Rejected</h3>
            <p className="text-sm text-gray-600">Over 75% of resumes are rejected by ATS before a human sees them</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">6-8 Seconds</h3>
            <p className="text-sm text-gray-600">Recruiters spend only 6-8 seconds scanning a resume</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Keywords Matter</h3>
            <p className="text-sm text-gray-600">Using the right keywords can increase interview chances by 40%</p>
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