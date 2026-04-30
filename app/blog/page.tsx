'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import { formatBlogDate, getAllBlogPosts } from '../lib/blog';

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const blogPosts = getAllBlogPosts();

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
    <section className="fade pb-16">
      <div className="grid gap-6">
        {blogPosts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 80}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="rounded-[30px] border border-slate-800 bg-slate-950/45 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="inline-flex items-center rounded-full border border-purple-700/40 bg-purple-950/30 px-3 py-1 font-medium text-purple-300">
                    {post.issueLabel}
                  </span>
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{formatBlogDate(post.publishedAt)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mb-4 max-w-4xl text-3xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-purple-300 sm:text-4xl">
                  {post.title}
                </h2>
                <p className="mb-5 max-w-3xl text-xl leading-8 text-slate-300">
                  {post.subtitle}
                </p>
                <p className="max-w-3xl text-lg leading-8 text-slate-400">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-purple-300 transition-transform group-hover:translate-x-1">
                  Read post
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={180}>
        <div
          id="newsletter"
          className="relative mt-12 overflow-hidden rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-purple-950/30 p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.18),transparent_40%)]" />
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Stay in the loop</p>
                <h2 className="text-2xl font-bold text-slate-100">Subscribe to the newsletter</h2>
              </div>
            </div>
            <p className="mb-6 max-w-2xl text-slate-300">
              New posts, personal updates, and occasional technical chaos delivered to your inbox. Unsubscribe whenever you want.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-800"
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
              <div className={`mt-4 rounded-xl p-3 ${subscribeStatus === 'success' ? 'border border-green-700/50 bg-green-900/30 text-green-300' : 'border border-red-700/50 bg-red-900/30 text-red-300'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
