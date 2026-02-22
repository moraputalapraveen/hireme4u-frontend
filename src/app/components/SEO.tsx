import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export function SEO({ title, description, keywords, ogImage }: SEOProps) {
  const location = useLocation();
  const fullTitle = `${title} | JobPortal`;
  const url = `https://jobportal.com${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords || 'jobs, careers, freshers, developers, job search, employment');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', 'website', 'property');
    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', fullTitle, 'name');
    updateMetaTag('twitter:description', description, 'name');
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage, 'name');
    }
  }, [fullTitle, description, keywords, url, ogImage]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}
