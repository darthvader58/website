'use client';

import { useState } from 'react';

type LatestPostSummary = {
  title: string;
  subtitle: string;
  issueLabel: string;
  publishedAt: string;
  readTime: string;
  slug: string;
  newsletterStatus: 'pending' | 'processing' | 'sent' | 'partial' | 'failed' | 'skipped_no_subscribers';
  newsletterSentAt: string | null;
  newsletterSentCount: number;
  newsletterFailedCount: number;
};

type NewsletterAdminClientProps = {
  latestPost: LatestPostSummary | null;
};

export default function NewsletterAdminClient({
  latestPost,
}: NewsletterAdminClientProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSendLatest = async () => {
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, mode: 'latest-post' }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        if (data.alreadySent) {
          setMessage(
            `Latest post was already sent${data.post?.title ? `: ${data.post.title}` : ''}.`
          );
          return;
        }
        if (data.status === 'processing' || data.status === 'pending') {
          setMessage(
            `Latest post processing started${data.post?.title ? `: ${data.post.title}` : ''}. Sent so far: ${data.sent}. Failed so far: ${data.failed}.`
          );
          return;
        }
        setMessage(
          `Latest post sent to ${data.sent} subscribers${data.post?.title ? `: ${data.post.title}` : ''}.`
        );
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send latest post newsletter');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while sending');
    }
  };

  const handleSendCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, postUrl, apiKey, mode: 'custom' }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`Custom newsletter sent successfully to ${data.sent} subscribers.`);
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

      <div className="mb-6 rounded-lg border border-slate-800 bg-slate-950/30 p-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-100">
          Send Latest Blog Post
        </h2>

        {latestPost ? (
          <div className="mb-5 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="inline-flex items-center rounded-full border border-purple-700/40 bg-purple-950/30 px-3 py-1 font-medium text-purple-300">
                {latestPost.issueLabel}
              </span>
              <span>{latestPost.publishedAt}</span>
              <span>•</span>
              <span>{latestPost.readTime}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100">{latestPost.title}</h3>
            <p className="mt-3 max-w-2xl text-slate-300">{latestPost.subtitle}</p>
            <p className="mt-3 text-sm text-slate-500">
              This send uses the latest post automatically:
              <span className="ml-2 font-mono text-slate-400">
                /blog/{latestPost.slug}
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Newsletter status:
              <span className="ml-2 font-medium text-slate-300">
                {latestPost.newsletterStatus === 'pending'
                  ? 'Pending send'
                  : latestPost.newsletterStatus}
              </span>
              {latestPost.newsletterSentAt ? (
                <span className="ml-2 text-slate-500">
                  · sent {new Date(latestPost.newsletterSentAt).toLocaleString()}
                </span>
              ) : null}
            </p>
            {latestPost.newsletterStatus !== 'pending' ? (
              <p className="mt-2 text-sm text-slate-500">
                Sent: {latestPost.newsletterSentCount} · Failed: {latestPost.newsletterFailedCount}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="mb-5 rounded-xl border border-amber-700/40 bg-amber-950/20 p-4 text-amber-200">
            No blog posts found. Add a post before sending the newsletter.
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Admin API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your admin API key"
          />
          <p className="mt-1 text-xs text-slate-500">
            Set as `NEWSLETTER_API_KEY` in local env and in your Vercel project environment variables.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSendLatest}
          disabled={status === 'loading' || !apiKey || !latestPost}
          className="mt-5 w-full rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-800"
        >
          {status === 'loading' ? 'Sending...' : 'Send Latest Post to Subscribers'}
        </button>

        {message && (
          <div
            className={`mt-4 rounded-lg border p-4 ${
              status === 'success'
                ? 'border-green-700/50 bg-green-900/30 text-green-300'
                : 'border-red-700/50 bg-red-900/30 text-red-300'
            }`}
          >
            {message}
          </div>
        )}
      </div>

      <div className="mb-6 rounded-lg border border-slate-800 bg-slate-950/30 p-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-100">
          Custom Broadcast
        </h2>

        <form onSubmit={handleSendCustom} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Title/Subject
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="New Blog Post: Building Scalable ML Systems"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Content (HTML supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="<p>Check out my latest blog post about...</p>"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Post URL (optional)
            </label>
            <input
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://shashwatraj.com/blog/the-black-box-has-a-group-chat"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || !apiKey}
            className="w-full rounded-lg bg-slate-700 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:bg-slate-800"
          >
            {status === 'loading' ? 'Sending...' : 'Send Custom Newsletter'}
          </button>
        </form>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950/30 p-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-100">Tips</h2>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>• “Send Latest Blog Post” pulls the newest post directly from your production blog source and records the send in the database.</li>
          <li>• The deployed app now supports an automated cron-based sweep for newly published unsent posts. Set `CRON_SECRET` in Vercel so the cron route stays private.</li>
          <li>• The latest-post email uses an editorial Substack-style layout with the post title, subtitle, excerpt, headings, and CTA.</li>
          <li>• “Custom Broadcast” is still there if you want a one-off email that is not tied to a blog post.</li>
          <li>• Subscribers and newsletter send history are stored in Postgres/Neon tables used by the deployed app.</li>
          <li>• Check the Resend dashboard for delivery status and failures.</li>
        </ul>
      </div>
    </section>
  );
}
