import { NextResponse } from 'next/server';
import {
  sendCustomNewsletter,
  sendLatestBlogPostNewsletter,
  sendLatestBlogPostTestEmail,
} from '@/app/lib/newsletter';

export async function POST(request: Request) {
  try {
    const { title, content, postUrl, apiKey, mode, force, toEmail } = await request.json();

    const ADMIN_API_KEY = process.env.NEWSLETTER_API_KEY;

    if (!ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'NEWSLETTER_API_KEY is not configured' },
        { status: 500 }
      );
    }
    
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (mode === 'latest-post-test') {
      if (!toEmail) {
        return NextResponse.json(
          { error: 'Test email address is required' },
          { status: 400 }
        );
      }

      const result = await sendLatestBlogPostTestEmail(toEmail);

      if (result.status === 'no_post') {
        return NextResponse.json(
          { error: 'No blog posts found to send' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Test email sent to ${result.toEmail}`,
        toEmail: result.toEmail,
        emailId: result.emailId,
        subject: result.subject,
        post: {
          slug: result.post.slug,
          title: result.post.title,
        },
      });
    }

    const sendLatestPost = mode === 'latest-post' || (!title && !content);

    if (sendLatestPost) {
      const result = await sendLatestBlogPostNewsletter({ force });

      if (result.status === 'no_post') {
        return NextResponse.json(
          { error: 'No blog posts found to send' },
          { status: 400 }
        );
      }

      if (result.status === 'already_sent') {
        return NextResponse.json(
          {
            success: true,
            alreadySent: true,
            message: `Latest post already sent on ${result.broadcast.sent_at}`,
            subscriberCount: result.broadcast.subscriber_count,
            sent: result.broadcast.sent_count,
            failed: result.broadcast.failed_count,
            post: {
              slug: result.post.slug,
              title: result.post.title,
            },
          }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Newsletter processed for ${result.post.title}`,
        subscriberCount: result.subscriberCount,
        sent: result.sent,
        failed: result.failed,
        errors: result.errors.length > 0 ? result.errors : undefined,
        post: {
          slug: result.post.slug,
          title: result.post.title,
        },
        status: result.status,
      });
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required for a custom newsletter' },
        { status: 400 }
      );
    }

    const result = await sendCustomNewsletter({ title, content, postUrl });

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${result.sent} of ${result.subscriberCount} subscribers`,
      subscriberCount: result.subscriberCount,
      sent: result.sent,
      failed: result.failed,
      errors: result.errors.length > 0 ? result.errors : undefined,
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending newsletter' },
      { status: 500 }
    );
  }
}
