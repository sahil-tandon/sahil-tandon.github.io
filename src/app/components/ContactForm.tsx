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
        setStatus({ state: 'success', message: 'Thanks for your message! I\'ll get back to you soon.' });
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({ 
        state: 'error', 
        message: 'Something went wrong. Please try again or email me directly at sahil.tandon@live.com. Thanks!' 
      });
    }
  }

  return (
    <section className="space-y-8">
      <h2 className="text-4xl font-semibold">Get in touch</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            disabled={status.state === 'submitting'}
            className="w-full p-4 bg-zinc-900 rounded-lg ring-offset-zinc-950 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all placeholder:text-zinc-600 disabled:opacity-50"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            disabled={status.state === 'submitting'}
            className="w-full p-4 bg-zinc-900 rounded-lg ring-offset-zinc-950 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all placeholder:text-zinc-600 disabled:opacity-50"
          />
          
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            required
            disabled={status.state === 'submitting'}
            className="w-full p-4 bg-zinc-900 rounded-lg ring-offset-zinc-950 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all placeholder:text-zinc-600 disabled:opacity-50"
          />
        </div>

        {status.message && (
          <div className={`p-4 rounded-lg ${
            status.state === 'success' 
              ? 'bg-emerald-900/50 text-emerald-200' 
              : 'bg-red-900/50 text-red-200'
          }`}>
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={status.state === 'submitting'}
          className="group relative px-6 py-3 bg-violet-400 text-zinc-900 rounded-lg hover:bg-violet-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-violet-400"
        >
          {status.state === 'submitting' ? 'Sending...' : 'Send message'}
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
        </button>
      </form>
    </section>
  );
}