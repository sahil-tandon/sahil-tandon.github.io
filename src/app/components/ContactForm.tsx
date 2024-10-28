'use client';

import { useState } from 'react';
import { Send, MessageSquareMore } from 'lucide-react';

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
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({ 
        state: 'error', 
        message: 'Something went wrong. Please try emailing me directly at sahil.tandon@live.com.' 
      });
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
          <div className="space-y-2">
            <label htmlFor="name" className="text-base text-zinc-500 font-light">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="How should I address you?"
              required
              disabled={status.state === 'submitting'}
              className="w-full p-4 bg-zinc-900/60 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-all placeholder:text-zinc-600 disabled:opacity-50 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-zinc-400 font-light">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Where can I reach you?"
              required
              disabled={status.state === 'submitting'}
              className="w-full p-4 bg-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-all placeholder:text-zinc-600 disabled:opacity-50 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm text-zinc-400 font-light">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="What would you like to discuss?"
              rows={4}
              required
              disabled={status.state === 'submitting'}
              className="w-full p-4 bg-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-all placeholder:text-zinc-600 disabled:opacity-50 text-lg resize-none"
            />
          </div>
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
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-violet-400/5 group-hover:opacity-100"></span>
                    
          <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 h-1/3"></span>
          <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
          <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
          <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-violet-400 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
                    
          <span className="absolute inset-0 w-full h-full border border-zinc-700 group-hover:border-violet-400 transition-colors duration-300"></span>
                    
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-violet-400 rounded-full group-hover:w-56 group-hover:h-56 opacity-[0.02]"></span>
                    
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