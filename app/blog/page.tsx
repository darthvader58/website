import Link from 'next/link';
import { Shell, SectionHeader } from '../components/Shell';
import { formatBlogDate, getAllBlogPosts } from '../lib/blog';
import BlogNewsletterSignup from './BlogNewsletterSignup';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="fade">
      <SectionHeader
        title="Blog"
        aside={
          <a
            href="/rss.xml"
            className="font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            RSS Feed →
          </a>
        }
      />

      <Shell className="px-6 py-7 sm:px-8">
        <p className="mb-6 text-[14px] leading-relaxed text-[var(--muted)]">
          Essays about software, machine learning, research, and the occasional detour into everything around them.
        </p>

        <div className="flex flex-col gap-4 rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-purple-400">
              Newsletter
            </p>
            <p className="text-sm font-semibold text-[var(--fg)]">Get new essays by email</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
              Follow along here or on{' '}
              <a
                href="https://substack.com/@shash58"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 transition-colors hover:text-purple-300"
              >
                Substack <span aria-hidden="true">↗</span>
              </a>
              .
            </p>
          </div>
          <a
            href="#newsletter"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[var(--fg)] px-4 py-2.5 text-sm font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Subscribe by email
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <article className="flex h-full flex-col rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--soft)]">
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--soft)]">
                  <span className="text-purple-400">{post.issueLabel}</span>
                  <span>·</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="font-serif text-2xl leading-[1.16] tracking-tight text-[var(--fg)] transition-colors group-hover:text-purple-400">
                  {post.title}
                </h2>
                <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-[var(--muted)]">
                  {post.subtitle}
                </p>
                <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-[var(--soft)]">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5 font-mono text-[10px]">
                  <time className="text-[var(--soft)]">{formatBlogDate(post.publishedAt)}</time>
                  <span className="whitespace-nowrap font-medium text-purple-400">{post.readTime} · Read →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <BlogNewsletterSignup />
      </Shell>
    </div>
  );
}
