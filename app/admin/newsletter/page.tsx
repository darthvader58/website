'use client';

import { useState } from 'react';

export default function NewsletterAdmin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, postUrl, apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`Newsletter sent successfully to ${data.sent} subscribers!`);
        setTitle('');
        setContent('');
        setPostUrl('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send newsletter');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while sending');
    }
  };

  return (
    <section className="fade max-w-4xl">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100">
        Newsletter Admin
      </h1>

      <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 mb-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Send Newsletter</h2>
        
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Title/Subject
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="New Blog Post: Building Scalable ML Systems"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content (HTML supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="<p>Check out my latest blog post about...</p>"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Post URL (optional)
            </label>
            <input
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://shashwatraj.com/blog/1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Admin API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your admin API key"
            />
            <p className="text-xs text-slate-500 mt-1">
              Set in .env.local as NEWSLETTER_API_KEY
            </p>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {status === 'loading' ? 'Sending...' : 'Send Newsletter'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            status === 'success' 
              ? 'bg-green-900/30 text-green-300 border border-green-700/50' 
              : 'bg-red-900/30 text-red-300 border border-red-700/50'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Tips</h2>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li>• Use HTML for formatting (p, h2, ul, li, strong, em tags supported)</li>
          <li>• Include a post URL to add a "Read Full Post" button</li>
          <li>• Test with your own email first</li>
          <li>• Subscribers are stored in data/subscribers.json</li>
          <li>• Check Resend dashboard for delivery status</li>
        </ul>
      </div>
    </section>
  );
}
