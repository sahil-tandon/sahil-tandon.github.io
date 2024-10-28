'use client';

import { useState } from 'react';
import { Send, MessageSquareMore } from 'lucide-react';

interface FormStatus {
  state: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  placeholder, 
  required = false, 
  disabled = false,
  rows 
}: FormFieldProps) => {
  const Component = rows ? 'textarea' : 'input';
  
  return (
    <div className="relative group space-y-2">
      <label htmlFor={name} className="text-base text-zinc-500 font-light block">
        {label}
      </label>
      <div className="relative">
        {/* Outer container for the glow effect */}
        <div className="absolute -inset-[1px] rounded-sm bg-gradient-to-r from-violet-400/0 via-violet-400/10 to-violet-400/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500 pointer-events-none" />
        
        {/* Input wrapper to preserve clickability */}
        <div className="relative">
          <Component
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className="relative w-full p-4 bg-zinc-900/60 text-lg
              placeholder:text-zinc-600 disabled:opacity-50
              focus:outline-none focus:ring-1 focus:ring-violet-400/50
              hover:bg-zinc-900/80 focus:bg-zinc-900/80
              transition-all duration-300
              group-hover:shadow-[0_0_15px_rgba(167,139,250,0.1)]
              group-focus-within:shadow-[0_0_20px_rgba(167,139,250,0.15)]
              resize-none align-bottom
              overflow-hidden
              box-border"
          />

          {/* Border that stays within input bounds */}
          <div className="absolute inset-0 rounded-sm border border-zinc-800 group-hover:border-violet-400/20 group-focus-within:border-violet-400/30 transition-colors duration-300 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

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