'use client';

import { useState } from 'react';

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
            <label htmlFor="name" className="text-sm text-zinc-400 font-light">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="How should I address you?"
              required
              disabled={status.state === 'submitting'}
              className="w-full p-4 bg-zinc-900/50 rounded-lg ring-offset-zinc-950 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-all placeholder:text-zinc-600 disabled:opacity-50 text-lg"
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
              className="w-full p-4 bg-zinc-900/50 rounded-lg ring-offset-zinc-950 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-all placeholder:text-zinc-600 disabled:opacity-50 text-lg"
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
              className="w-full p-4 bg-zinc-900/50 rounded-lg ring-offset-zinc-950 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-all placeholder:text-zinc-600 disabled:opacity-50 text-lg resize-none"
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
          className="group relative px-8 py-4 bg-violet-400 text-zinc-900 rounded-lg font-medium text-lg hover:bg-violet-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-violet-400"
        >
          {status.state === 'submitting' ? 'Sending...' : "Get in Touch"}
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
        </button>
      </form>
    </section>
  );
}