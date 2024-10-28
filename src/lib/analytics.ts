export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
};

export const initGA = () => {
  const TRACKING_ID = 'G-EYYW253R71';
  
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: false
  });
};

export const trackPageView = (url: string) => {
  if (!window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: document.title,
    page_location: window.location.href
  });
};

export const trackEvent = ({ action, category, label, value, nonInteraction = false }: AnalyticsEvent) => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: nonInteraction
  });
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