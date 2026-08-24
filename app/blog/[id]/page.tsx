import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatBlogDate, getPublishedBlogPosts } from '@/app/lib/blog';
import { getBlogImagePath } from '@/app/lib/blog/images';
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
    <section className="fade pb-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center text-sm text-[var(--muted)] transition-colors hover:text-purple-400 sm:mb-14"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all blogs
        </Link>

        <article>
          <header className="mb-12 border-b border-[var(--line)] pb-10 sm:mb-16 sm:pb-14">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--soft)]">
              <span className="text-purple-400">{post.category}</span>
              <span>·</span>
              <time>{formatBlogDate(post.publishedAt)}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="font-serif text-4xl leading-[1.08] tracking-[-0.035em] text-[var(--fg)] sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-[var(--muted)] sm:text-2xl sm:leading-9">
              {post.subtitle}
            </p>
            <p className="mt-7 text-sm text-[var(--soft)]">By Shashwat Raj · {post.issueLabel}</p>
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

          <div className="mt-12 border-y border-[var(--line)] py-9 sm:py-10">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--soft)]">Next issue</p>
            <h2 className="mt-3 text-2xl font-bold text-[var(--fg)]">More personal, more technical, probably still slightly unhinged.</h2>
            <p className="mt-4 max-w-2xl text-[var(--muted)]">
              If you want the next post without visiting this web page each time, subscribe and I&apos;ll send it directly.
            </p>
            <Link
              href="/blog#newsletter"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Subscribe to Newsletter
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
