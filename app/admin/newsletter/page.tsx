import { formatBlogDate, getLatestPublishedBlogPost } from '@/app/lib/blog';
import {
  generateBlogPostNewsletterEmail,
  getBlogPostEmailSubject,
} from '@/app/lib/email-templates';
import { getNewsletterBroadcast } from '@/app/lib/newsletter';
import NewsletterAdminClient from './NewsletterAdminClient';

export const dynamic = 'force-dynamic';

export default async function NewsletterAdminPage() {
  const latestPost = getLatestPublishedBlogPost();
  const latestPostBroadcast = latestPost
    ? await getNewsletterBroadcast(latestPost.slug)
    : null;
  const latestPostPreviewHtml = latestPost
    ? generateBlogPostNewsletterEmail(latestPost)
    : null;
  const latestPostPreviewSubject = latestPost
    ? getBlogPostEmailSubject(latestPost)
    : null;

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
              newsletterStatus: latestPostBroadcast?.status ?? 'pending',
              newsletterSentAt: latestPostBroadcast?.sent_at ?? null,
              newsletterSentCount: latestPostBroadcast?.sent_count ?? 0,
              newsletterFailedCount: latestPostBroadcast?.failed_count ?? 0,
              newsletterPreviewSubject: latestPostPreviewSubject ?? '',
              newsletterPreviewHtml: latestPostPreviewHtml ?? '',
            }
          : null
      }
    />
  );
}
