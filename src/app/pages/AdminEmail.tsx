import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { 
  Mail, Send, CheckCircle, XCircle, Users,
  Search, Filter, Download, Trash2, RefreshCw,
  AlertCircle, CheckSquare, Square, Eye
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import config from '../../../config';

interface Subscriber {
  _id: string;
  email: string;
  categories: string[];
  keywords: string[];
  frequency: 'daily' | 'weekly';
  verified: boolean;
  lastSentAt?: string;
  createdAt: string;
}

export function AdminEmail() {
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useJobs();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
  
  // Email compose state
  const [showComposer, setShowComposer] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sending, setSending] = useState(false);

  // Fetch subscribers
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/secret123');
      return;
    }
    fetchSubscribers();
  }, [isAdminLoggedIn, navigate]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${config.apiUrl}/job-alerts/subscribers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(response.data.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  // Handle select all
  useEffect(() => {
    if (selectAll) {
      setSelectedEmails(filteredSubscribers.map(s => s.email));
    } else {
      setSelectedEmails([]);
    }
  }, [selectAll, searchTerm, filterVerified]);

  // Filter subscribers
  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerified = 
      filterVerified === 'all' ? true :
      filterVerified === 'verified' ? sub.verified :
      !sub.verified;
    return matchesSearch && matchesVerified;
  });

  // Handle individual selection
  const toggleSelect = (email: string) => {
    setSelectedEmails(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
    setSelectAll(false);
  };

  // Send email to selected subscribers
  const sendEmailToSelected = async () => {
    if (selectedEmails.length === 0) {
      toast.error('Please select at least one email');
      return;
    }
    if (!emailSubject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!emailBody.trim()) {
      toast.error('Please enter email body');
      return;
    }

    setSending(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${config.apiUrl}/job-alerts/send-bulk`,
        {
          recipients: selectedEmails,
          subject: emailSubject,
          body: emailBody
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        toast.success(`Email sent to ${selectedEmails.length} subscribers!`);
        setShowComposer(false);
        setEmailSubject('');
        setEmailBody('');
        setSelectedEmails([]);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  // Delete selected subscribers
  const deleteSelected = async () => {
    if (selectedEmails.length === 0) {
      toast.error('No subscribers selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedEmails.length} subscribers?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${config.apiUrl}/job-alerts/bulk-delete`,
        { emails: selectedEmails },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success(`Deleted ${selectedEmails.length} subscribers`);
      setSelectedEmails([]);
      fetchSubscribers();
    } catch (error) {
      toast.error('Failed to delete subscribers');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Email Subscribers</h1>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
                <p className="text-3xl font-bold text-gray-900">{subscribers.length}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-3xl font-bold text-green-600">
                  {subscribers.filter(s => s.verified).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unverified</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {subscribers.filter(s => !s.verified).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected</p>
                <p className="text-3xl font-bold text-indigo-600">{selectedEmails.length}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Subscribers</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>

            <button
              onClick={fetchSubscribers}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Action Bar */}
        {selectedEmails.length > 0 && (
          <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
            <span className="text-indigo-700 font-medium">
              {selectedEmails.length} email{selectedEmails.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setShowComposer(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button
                onClick={deleteSelected}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() => setSelectedEmails([])}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Email Composer Modal */}
        {showComposer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Compose Email</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Sending to {selectedEmails.length} recipient{selectedEmails.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                    {selectedEmails.map(email => (
                      <span key={email} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm mr-2 mb-2">
                        {email}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter email subject..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                    placeholder="Type your email message here..."
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> This will send real emails to all selected recipients.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowComposer(false);
                    setEmailSubject('');
                    setEmailBody('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={sendEmailToSelected}
                  disabled={sending || !emailSubject.trim() || !emailBody.trim()}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {sending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send to {selectedEmails.length} Recipients
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subscribers Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => setSelectAll(!selectAll)}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      {selectAll ? (
                        <CheckSquare className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                      Select
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Categories</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Frequency</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Subscribed</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Last Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubscribers.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleSelect(sub.email)}
                        className="flex items-center"
                      >
                        {selectedEmails.includes(sub.email) ? (
                          <CheckSquare className="w-5 h-5 text-indigo-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {sub.categories.map(cat => (
                          <span key={cat} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm capitalize">{sub.frequency}</td>
                    <td className="px-6 py-4">
                      {sub.verified ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                          <AlertCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {sub.lastSentAt ? new Date(sub.lastSentAt).toLocaleDateString() : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No subscribers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}