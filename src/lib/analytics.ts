export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
};

let isInitialized = false;

export const initGA = () => {
  return new Promise((resolve, reject) => {
    console.log('🔍 Initializing GA4...');
    const TRACKING_ID = 'G-EYYW253R71';
    
    try {      
      if (typeof window.gtag !== 'undefined') {
        console.log('🔍 GA4 already initialized');
        isInitialized = true;
        resolve(true);
        return;
      }
      
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
      script.async = true;
      
      script.onload = () => {
        console.log('🔍 GA4 script loaded successfully');
        gtag('js', new Date());
        gtag('config', TRACKING_ID, {
          debug_mode: true,
          page_path: window.location.pathname,
          send_page_view: true
        });
        console.log(`🔍 GA4 config completed with ID ${TRACKING_ID}`);
        isInitialized = true;
        resolve(true);
      };
      
      script.onerror = (error) => {
        console.error('❌ Error loading GA4 script:', error);
        reject(error);
      };
      
      document.head.appendChild(script);
    } catch (error) {
      console.error('❌ Error during GA4 initialization:', error);
      reject(error);
    }
  });
};

const ensureInitialized = async () => {
  if (!isInitialized) {
    await initGA();
  }
  return isInitialized;
};

export const trackPageView = async (url: string) => {
  console.log('🔍 Attempting to track page view:', url);
  
  try {
    await ensureInitialized();
    
    if (!window.gtag) {
      throw new Error('gtag not found after initialization');
    }
    
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href
    });
    console.log('✅ Successfully tracked page view:', url);
  } catch (error) {
    console.error('❌ Error tracking page view:', error);
  }
};

export const trackEvent = async ({ action, category, label, value, nonInteraction = false }: AnalyticsEvent) => {
  console.log('🔍 Attempting to track event:', { action, category, label });
  
  try {
    await ensureInitialized();
    
    if (!window.gtag) {
      throw new Error('gtag not found after initialization');
    }

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction
    });
    console.log('✅ Successfully tracked event:', { action, category, label });
  } catch (error) {
    console.error('❌ Error tracking event:', error);
  }
};

export const trackLinkClick = (linkName: string, url: string) => {
  trackEvent({
    action: 'click',
    category: 'Link',
    label: `${linkName} - ${url}`
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent({
    action: 'submit',
    category: 'Form',
    label: `${formName} - ${success ? 'Success' : 'Failed'}`
  });
};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}