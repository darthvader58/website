import { formatBlogDate, getLatestBlogPost } from '@/app/lib/blog';
import NewsletterAdminClient from './NewsletterAdminClient';

export default function NewsletterAdminPage() {
  const latestPost = getLatestBlogPost();

  return (
    <NewsletterAdminClient
      latestPost={
        latestPost
          ? {
              title: latestPost.title,
              subtitle: latestPost.subtitle,
              issueLabel: latestPost.issueLabel,
              publishedAt: formatBlogDate(latestPost.publishedAt),
              readTime: latestPost.readTime,
              slug: latestPost.slug,
            }
          : null
      }
    />
  );
}
