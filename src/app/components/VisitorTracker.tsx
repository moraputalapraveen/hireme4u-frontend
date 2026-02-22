import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';


const API_URL = config.apiUrl

export function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`${API_URL}/visitor/track`, {
          page: location.pathname,
          referrer: document.referrer || 'direct'
        });
      } catch (error) {
        // Silently fail - don't affect user experience
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, [location]);

  return null; // This component doesn't render anything
}