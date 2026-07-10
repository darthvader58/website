'use client';

import { useState } from 'react';

export default function BlogNewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus('success');
        setMessage('Successfully subscribed! Check your email for confirmation.');
        setEmail('');
      } else {
        setSubscribeStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setSubscribeStatus('error');
      setMessage('An error occurred. Please try again later.');
    }

    setTimeout(() => {
      setSubscribeStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div
      id="newsletter"
      className="blog-newsletter mt-14 border-y border-slate-800 px-4 py-12 sm:px-8 sm:py-14"
    >
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-purple-300">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Stay in the loop</p>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Thoughtful writing, delivered.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
          New essays, personal updates, and occasional technical chaos—sent directly to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="blog-newsletter-input min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
          <button
            type="submit"
            disabled={subscribeStatus === 'loading'}
            className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {subscribeStatus === 'loading' ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        {message && (
          <div className={`mt-4 text-sm ${subscribeStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
