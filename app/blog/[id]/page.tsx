import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatBlogDate, getPublishedBlogPosts } from '@/app/lib/blog';
import { getBlogImagePath } from '@/app/lib/blog/images';
import { Shell, SectionHeader } from '@/app/components/Shell';
import BlogCodeCopyButtons from '../BlogCodeCopyButtons';

type BlogPostPageProps = {
  params: {
    id: string;
  };
};

export const dynamicParams = false;

function getPublishedBlogPost(id: string) {
  return getPublishedBlogPosts().find((post) => post.slug === id);
}

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({
    id: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPublishedBlogPost(params.id);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Shashwat Raj`,
    description: post.excerpt,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags,
    alternates: {
      canonical: `https://shashwatraj.com/blog/${post.slug}`,
      types: {
        'application/rss+xml': 'https://shashwatraj.com/rss.xml',
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      url: `https://shashwatraj.com/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPublishedBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="fade">
      <SectionHeader
        title="Blog"
        aside={
          <Link
            href="/blog"
            className="font-mono text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            ← All posts
          </Link>
        }
      />

      <Shell className="px-6 py-8 sm:px-8 sm:py-10">
        <article className="mx-auto max-w-[620px]">
          <header className="mb-8 border-b border-[var(--line)] pb-7 sm:mb-10 sm:pb-9">
            <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-wider text-[var(--soft)]">
              <span className="text-purple-400">{post.category}</span>
              <span>·</span>
              <time>{formatBlogDate(post.publishedAt)}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="font-serif text-3xl leading-[1.1] tracking-tight text-[var(--fg)] sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
              {post.subtitle}
            </p>
            <p className="mt-5 font-mono text-[10px] text-[var(--soft)]">By Shashwat Raj · {post.issueLabel}</p>
          </header>

          <div>
            <div className="blog-prose">
              {post.blocks.map((block, index) => {
                if (block.type === 'html') {
                  return (
                    <div
                      key={`${post.slug}-html-${index}`}
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                }

                const imageSrc = getBlogImagePath(post.imageDirectory, block.fileName);

                if (!imageSrc) {
                  return null;
                }

                return (
                  <figure key={`${post.slug}-${block.fileName}`} className="blog-figure">
                    <div className="blog-figure-frame">
                      <img
                        src={imageSrc}
                        alt={block.alt}
                        className="blog-figure-image"
                      />
                    </div>
                    {block.captionHtml ? (
                      <figcaption
                        className="blog-caption"
                        dangerouslySetInnerHTML={{ __html: block.captionHtml }}
                      />
                    ) : block.caption ? (
                      <figcaption className="blog-caption">{block.caption}</figcaption>
                    ) : null}
                  </figure>
                );
              })}
              <BlogCodeCopyButtons />
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-[var(--soft)]">Next issue</p>
            <h2 className="mt-2.5 font-serif text-xl leading-snug text-[var(--fg)]">More personal, more technical, probably still slightly unhinged.</h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-[var(--muted)]">
              If you want the next post without visiting this web page each time, subscribe and I&apos;ll send it directly.
            </p>
            <Link
              href="/blog#newsletter"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-4 py-2 text-[13px] font-semibold text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Subscribe to Newsletter
            </Link>
          </div>
        </article>
      </Shell>
    </div>
  );
}
