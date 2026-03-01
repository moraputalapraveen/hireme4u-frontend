import axios from 'axios';
import config from '../../../config';

export interface AnalyticsData {
  activeNow: number;
  todayVisits: number;
  totalPageViews: number;
  totalVisitors: number;
  avgTimeOnSite: string;
  dailyStats: Array<{
    date: string;
    views: number;
    visitors: number;
    newVisitors: number;
  }>;
  newVisitors: number;
  returningVisitors: number;
  returningRate: number;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  topReferrers: Array<{ source: string; count: number }>;
  topCountries: Array<{ country: string | null; count: number }>;
}

class AnalyticsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl.endsWith('/api') 
      ? config.apiUrl 
      : `${config.apiUrl}/api`;
  }

  // ✅ ADD THIS METHOD - for tracking page views
 async trackPageView(url: string) {
  try {
    // Get or create visitor ID
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitorId', visitorId);
    }

    // Check if this is a new visitor
    const hasVisited = localStorage.getItem('hasVisited');
    const isNewVisitor = !hasVisited;
    if (isNewVisitor) {
      localStorage.setItem('hasVisited', 'true');
    }

    // Get the referrer (where they came from)
    const referrer = document.referrer || 'direct';
    
    // Extract domain from referrer for cleaner display
    let referrerDomain = 'direct';
    if (referrer !== 'direct') {
      try {
        const url = new URL(referrer);
        referrerDomain = url.hostname.replace('www.', '');
        
        // Categorize common social media platforms
        if (referrerDomain.includes('facebook.com') || referrerDomain.includes('fb.com')) {
          referrerDomain = 'Facebook';
        } else if (referrerDomain.includes('instagram.com')) {
          referrerDomain = 'Instagram';
        } else if (referrerDomain.includes('linkedin.com')) {
          referrerDomain = 'LinkedIn';
        } else if (referrerDomain.includes('twitter.com') || referrerDomain.includes('x.com')) {
          referrerDomain = 'Twitter/X';
        } else if (referrerDomain.includes('google')) {
          referrerDomain = 'Google Search';
        } else if (referrerDomain.includes('whatsapp.com')) {
          referrerDomain = 'WhatsApp';
        } else if (referrerDomain.includes('telegram.org')) {
          referrerDomain = 'Telegram';
        } else if (referrerDomain.includes('youtube.com')) {
          referrerDomain = 'YouTube';
        }
      } catch (e) {
        // If URL parsing fails, use the raw referrer
        referrerDomain = referrer;
      }
    }

    console.log(`📊 Tracking page view: ${url} | Referrer: ${referrerDomain}`);

    await axios.post(`${this.baseUrl}/analytics/track`, {
      eventType: 'page_view',
      eventData: url,
      url: url,
      visitorId: visitorId,
      isNewVisitor: isNewVisitor,
      referrer: referrerDomain, // Send cleaned referrer
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error('❌ Error tracking page view:', error);
  }
}
  async getDashboardData(): Promise<AnalyticsData> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${this.baseUrl}/analytics/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Dashboard data received:', response.data);
      
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      
      return this.getEmptyData();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return this.getEmptyData();
    }
  }

  private getEmptyData(): AnalyticsData {
    return {
      activeNow: 0,
      todayVisits: 0,
      totalPageViews: 0,
      totalVisitors: 0,
      avgTimeOnSite: '0m',
      dailyStats: [],
      newVisitors: 0,
      returningVisitors: 0,
      returningRate: 0,
      devices: { desktop: 0, mobile: 0, tablet: 0 },
      topReferrers: [],
      topCountries: []
    };
  }
}

export default new AnalyticsService();