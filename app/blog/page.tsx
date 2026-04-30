import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import { formatBlogDate, getAllBlogPosts } from '../lib/blog';
import BlogNewsletterSignup from './BlogNewsletterSignup';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

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
        <BlogNewsletterSignup />
      </ScrollReveal>
    </section>
  );
}
