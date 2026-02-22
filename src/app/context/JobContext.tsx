import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import config from '../../../config';

const API_URL = config.apiUrl;

// Define types
export interface Job {
  _id?: string;
  id?: string;
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
  slug?: string;
  postedDate?: string;
}

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  addJob: (jobData: any) => Promise<Job>;
  toggleBookmark: (jobId: string) => void;
  isBookmarked: (jobId: string) => boolean;
  adminLogin: (username: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  adminLogout: () => void;
  isAdminLoggedIn: () => boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined)
// Use environment variable for API URL



export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs()
    loadBookmarks()
  }, [])

  const fetchJobs = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await axios.get<{ jobs: Job[] }>(`${API_URL}/jobs`)
      setJobs(response.data.jobs || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  // Add new job (protected - needs admin token)
  const addJob = async (jobData: any): Promise<Job> => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        throw new Error('No admin token found')
      }
      
      const response = await axios.post<{ job: Job }>(`${API_URL}/admin/jobs`, jobData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      // Add the new job to state
      setJobs((prevJobs: Job[]) => [response.data.job, ...prevJobs])
      return response.data.job
    } catch (error) {
      console.error('Error adding job:', error)
      throw error
    }
  }

  // Admin login
  const adminLogin = async (username: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password
      })
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token)
        return { success: true, data: response.data }
      }
      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  // Admin logout
  const adminLogout = (): void => {
    localStorage.removeItem('adminToken')
  }

  // Check if admin is logged in
  const isAdminLoggedIn = (): boolean => {
    return !!localStorage.getItem('adminToken')
  }

  // Bookmark functions
const toggleBookmark = (jobId: string) => {  // jobId will be MongoDB _id
  setBookmarks((prevBookmarks: string[]) => {
    const newBookmarks = prevBookmarks.includes(jobId) 
      ? prevBookmarks.filter((id: string) => id !== jobId)
      : [...prevBookmarks, jobId]
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
    return newBookmarks
  })
}

  const loadBookmarks = (): void => {
    try {
      const saved = localStorage.getItem('bookmarks')
      if (saved) {
        setBookmarks(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error)
      setBookmarks([])
    }
  }

 const isBookmarked = (jobId: string): boolean => {
  return bookmarks.includes(jobId)  // Compare with MongoDB _id
}

  return (
    <JobContext.Provider value={{ 
      jobs, 
      loading,
      addJob, 
      toggleBookmark, 
      isBookmarked,
      adminLogin,
      adminLogout,
      isAdminLoggedIn
    }}>
      {children}
    </JobContext.Provider>
  )
}

export function useJobs(): JobContextType {
  const context = useContext(JobContext)
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider')
  }
  return context
}