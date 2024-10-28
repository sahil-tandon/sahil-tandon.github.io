'use client';

import { useState } from 'react';
import { trackFormSubmission } from '@/lib/analytics';
import { Send, MessageSquareMore } from 'lucide-react';
import { FormField } from '@/components/FormField';

interface FormStatus {
  state: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: 'submitting' });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xeoqonlb', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus({ state: 'success', message: "Thanks for reaching out! I'll get back to you within 24 hours." });
        form.reset();
        trackFormSubmission('Contact Form', true);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({ 
        state: 'error', 
        message: 'Something went wrong. Please try emailing me directly at sahil.tandon@live.com.' 
      });
      trackFormSubmission('Contact Form', false);
    }
  }

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-4xl sm:text-5xl font-light tracking-wide text-violet-100">Let's Connect</h2>
        <p className="text-zinc-400 text-lg font-light">Have an idea in mind or got an opportunity to discuss? I'd love to hear from you.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            label="Name"
            name="name"
            placeholder="How should I address you?"
            required
            disabled={status.state === 'submitting'}
          />
          
          <FormField
            label="Email"
            type="email"
            name="email"
            placeholder="Where can I reach you?"
            required
            disabled={status.state === 'submitting'}
          />
          
          <FormField
            label="Message"
            name="message"
            placeholder="What would you like to discuss?"
            required
            disabled={status.state === 'submitting'}
            rows={4}
          />
        </div>

        {status.message && (
          <div className={`p-4 rounded-lg ${
            status.state === 'success' 
              ? 'bg-emerald-900/30 text-emerald-200 border border-emerald-500/20' 
              : 'bg-red-900/30 text-red-200 border border-red-500/20'
          }`}>
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={status.state === 'submitting'}
          className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-normal text-zinc-400 hover:text-violet-400 transition-colors duration-300 disabled:opacity-50"
        >          
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-violet-400/5 group-hover:opacity-100" />
          <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 h-1/3" />
          <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
          <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
          <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
          <span className="absolute inset-0 w-full h-full border border-zinc-700 group-hover:border-violet-400 transition-colors duration-300" />
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-violet-400 rounded-full group-hover:w-56 group-hover:h-56 opacity-[0.02]" />
          
          <span className="relative inline-flex items-center gap-2">
            {status.state === 'submitting' ? (
              <>
                <Send className="w-5 h-5 animate-pulse" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <MessageSquareMore className="w-5 h-5" />
                <span>Get in Touch</span>
              </>
            )}
          </span>
        </button>
      </form>
    </section>
  );
}