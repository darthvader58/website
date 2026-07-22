import Link from 'next/link';
import { formatBlogDate, getAllBlogPosts } from '../lib/blog';
import BlogNewsletterSignup from './BlogNewsletterSignup';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <section className="pb-16">
      <div className="mx-auto mb-6 flex max-w-5xl flex-col gap-3 rounded-xl border border-purple-500/20 bg-purple-950/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-100">Get new essays by email</p>
          <p className="mt-1 text-sm text-slate-400">
            The newsletter is the best way to follow along. I also publish on{' '}
            <a
              href="https://substack.com/@shash58"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 transition-colors hover:text-purple-200"
            >
              Substack <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#newsletter"
            className="inline-flex shrink-0 items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
          >
            Subscribe by email
          </a>
          <a
            href="/rss.xml"
            className="inline-flex shrink-0 items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:border-purple-400 hover:text-purple-200"
          >
            RSS feed
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
            <article className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-950/30 p-5 transition-colors hover:border-purple-500/50 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-slate-500">
                <span className="text-purple-300">{post.issueLabel}</span>
                <span>·</span>
                <span>{post.category}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold leading-[1.16] tracking-[-0.025em] text-slate-100 transition-colors group-hover:text-purple-300 lg:text-[1.65rem]">
                {post.title}
              </h2>
              <p className="mt-3 line-clamp-2 text-base leading-6 text-slate-300">
                {post.subtitle}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs">
                <time className="text-slate-500">{formatBlogDate(post.publishedAt)}</time>
                <span className="whitespace-nowrap font-medium text-purple-300">{post.readTime} · Read →</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mx-auto max-w-3xl">
        <BlogNewsletterSignup />
      </div>
    </section>
  );
}
