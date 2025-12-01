'use client';

import { useState } from 'react';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('You have been successfully unsubscribed.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to unsubscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="fade max-w-2xl mx-auto">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100">
        Unsubscribe
      </h1>

      {status === 'success' ? (
        <div className="border border-green-700/50 rounded-lg p-8 bg-green-900/20">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            Successfully Unsubscribed
          </h2>
          <p className="text-slate-300 mb-4">
            You've been removed from the newsletter. You won't receive any more emails from us.
          </p>
          <p className="text-slate-400 text-sm">
            Changed your mind? You can always <a href="/blog" className="text-purple-400 hover:text-purple-300 underline">subscribe again</a>.
          </p>
        </div>
      ) : (
        <>
          <p className="text-slate-400 text-lg mb-8">
            Sorry to see you go! Enter your email address below to unsubscribe from the newsletter.
          </p>

          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
            </button>
          </form>

          {status === 'error' && (
            <div className="mt-4 p-4 rounded-lg bg-red-900/30 text-red-300 border border-red-700/50">
              {message}
            </div>
          )}
        </>
      )}
    </section>
  );
}
