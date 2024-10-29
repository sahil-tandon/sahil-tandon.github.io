export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
};

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js', 
      targetId: string | Date, 
      config?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = ({ action, category, label, value, nonInteraction = false }: AnalyticsEvent) => {
  try {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        non_interaction: nonInteraction,
        send_to: 'G-EYYW253R71'
      });
      console.log('✅ Tracked event:', { action, category, label });
    }
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