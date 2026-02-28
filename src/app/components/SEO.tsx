import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export function SEO({ title, description, keywords, ogImage, canonical }) {
  // Add canonical URL
  if (canonical) {
    updateMetaTag('canonical', canonical, 'rel');
  }
  
  // Add Open Graph for job sharing
  updateMetaTag('og:type', 'website', 'property');
  updateMetaTag('og:title', title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:url', window.location.href, 'property');
  updateMetaTag('og:site_name', 'HireMe4U', 'property');
  
  // Twitter cards
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
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
