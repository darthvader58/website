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
        <div className="mx-auto max-w-[660px]">
          <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">
            Essays about software, machine learning, research, and the occasional detour into everything around them.
          </p>

          <div className="flex flex-col gap-4 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div>
              <p className="mb-1.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-purple-400">
                Newsletter
              </p>
              <p className="text-[13px] font-semibold text-[var(--fg)]">Get new essays by email</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
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
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[var(--fg)] px-4 py-2 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Subscribe by email
            </a>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--soft)]">
                  <div className="mb-2.5 flex flex-wrap items-center gap-1.5 font-mono text-[9px] font-medium uppercase tracking-wider text-[var(--soft)]">
                    <span className="text-purple-400">{post.issueLabel}</span>
                    <span>·</span>
                    <span>{post.category}</span>
                  </div>
                  <h2 className="font-serif text-xl leading-[1.18] tracking-tight text-[var(--fg)] transition-colors group-hover:text-purple-400">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-[var(--muted)]">
                    {post.subtitle}
                  </p>
                  <p className="mt-2.5 line-clamp-3 text-[12px] leading-relaxed text-[var(--soft)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4 font-mono text-[9px]">
                    <time className="text-[var(--soft)]">{formatBlogDate(post.publishedAt)}</time>
                    <span className="whitespace-nowrap font-medium text-purple-400">{post.readTime} · Read →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <BlogNewsletterSignup />
        </div>
      </Shell>
    </div>
  );
}
