import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import { formatBlogDate, getAllBlogPosts } from '../lib/blog';
import BlogNewsletterSignup from './BlogNewsletterSignup';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <section className="fade pb-16">
      <div className="mx-auto max-w-3xl">
        {blogPosts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 80}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="border-b border-slate-800 py-9 transition-colors sm:py-11">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  <span className="text-purple-300">{post.issueLabel}</span>
                  <span>·</span>
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-serif text-3xl font-bold leading-[1.14] tracking-[-0.025em] text-slate-100 transition-colors group-hover:text-purple-300 sm:text-[2.5rem]">
                  {post.title}
                </h2>
                <p className="mt-3 text-lg leading-8 text-slate-300 sm:text-xl">
                  {post.subtitle}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <time className="text-slate-500">{formatBlogDate(post.publishedAt)}</time>
                  <span className="font-medium text-purple-300 transition-transform group-hover:translate-x-1">Read essay →</span>
                </div>
              </article>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={180}>
        <div className="mx-auto max-w-3xl">
          <BlogNewsletterSignup />
        </div>
      </ScrollReveal>
    </section>
  );
}
