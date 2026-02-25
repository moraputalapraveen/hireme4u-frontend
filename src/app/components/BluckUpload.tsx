import { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Download, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import config from '../../../config';

export function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { isAdminLoggedIn } = useJobs();

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/upload/template`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'job_template.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Template downloaded');
    } catch (error) {
      toast.error('Failed to download template');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${config.apiUrl}/upload/bulk`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      setResult(response.data);
      toast.success(`Created ${response.data.created} jobs`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!isAdminLoggedIn()) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Bulk Job Upload</h2>
      
      <div className="space-y-4">
        {/* Download Template */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Download CSV Template</h3>
            <p className="text-sm text-gray-600">Use this template to bulk upload multiple jobs</p>
          </div>
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Template
          </button>
        </div>
        
        {/* Upload File */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Upload your completed CSV file
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
        
        {/* Upload Button */}
        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Jobs'}
          </button>
        )}
        
        {/* Results */}
        {result && (
          <div className={`p-4 rounded-lg ${result.errors.length > 0 ? 'bg-yellow-50' : 'bg-green-50'}`}>
            <div className="flex items-start gap-2">
              {result.errors.length > 0 ? (
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              )}
              <div>
                <p className="font-medium">
                  Created {result.created} of {result.created + result.errors.length} jobs
                </p>
                {result.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-yellow-700">Errors:</p>
                    <ul className="text-sm text-yellow-600 list-disc pl-4">
                      {result.errors.map((err: string, i: number) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}