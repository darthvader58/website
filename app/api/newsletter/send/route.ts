import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sql } from '@vercel/postgres';
import {
  generateLatestPostNewsletterEmail,
  generateLatestPostNewsletterText,
  generateNewsletterEmail,
} from '@/app/lib/email-templates';
import { getLatestBlogPost } from '@/app/lib/blog';

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getCustomEmailText(title: string, content: string, postUrl?: string) {
  return [title, '', stripHtml(content), postUrl ? `Read more: ${postUrl}` : '']
    .filter(Boolean)
    .join('\n');
}

export async function POST(request: Request) {
  try {
    const { title, content, postUrl, apiKey, mode } = await request.json();
    const resendApiKey = process.env.RESEND_API_KEY;

    // Simple API key protection
    const ADMIN_API_KEY = process.env.NEWSLETTER_API_KEY || 'your-secret-key';
    
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Get all active subscribers from database
    const result = await sql`
      SELECT email FROM subscribers WHERE active = true
    `;

    const subscribers = result.rows;

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 400 }
      );
    }

    const sendLatestPost = mode === 'latest-post' || (!title && !content);

    let subject = title;
    let emailHTML = '';
    let emailText = '';
    let latestPostSummary:
      | {
          slug: string;
          title: string;
        }
      | undefined;

    if (sendLatestPost) {
      const latestPost = getLatestBlogPost();

      if (!latestPost) {
        return NextResponse.json(
          { error: 'No blog posts found to send' },
          { status: 400 }
        );
      }

      subject = `${latestPost.issueLabel}: ${latestPost.title}`;
      emailHTML = generateLatestPostNewsletterEmail(latestPost);
      emailText = generateLatestPostNewsletterText(latestPost);
      latestPostSummary = {
        slug: latestPost.slug,
        title: latestPost.title,
      };
    } else {
      if (!title || !content) {
        return NextResponse.json(
          { error: 'Title and content are required for a custom newsletter' },
          { status: 400 }
        );
      }

      emailHTML = generateNewsletterEmail(title, content, postUrl);
      emailText = getCustomEmailText(title, content, postUrl);
    }

    // Send emails using Resend
    const resend = new Resend(resendApiKey);
    const emailResults: Array<{
      email: string;
      success: true;
      id: string | undefined;
    }> = [];
    const errors: Array<{
      email: string | undefined;
      error: string;
    }> = [];
    const BATCH_SIZE = 10;

    for (let index = 0; index < subscribers.length; index += BATCH_SIZE) {
      const batch = subscribers.slice(index, index + BATCH_SIZE);
      const batchResults = await Promise.allSettled(
        batch.map(async (subscriber) => {
          const emailResult = await resend.emails.send({
            from: 'Shashwat Raj <newsletter@shashwatraj.com>',
            to: subscriber.email,
            subject,
            html: emailHTML,
            text: emailText,
          });

          return {
            email: subscriber.email,
            id: emailResult.data?.id,
          };
        })
      );

      batchResults.forEach((batchResult, batchIndex) => {
        const email = batch[batchIndex]?.email;

        if (batchResult.status === 'fulfilled') {
          emailResults.push({
            email: batchResult.value.email,
            success: true,
            id: batchResult.value.id,
          });
          return;
        }

        console.error(`Failed to send to ${email}:`, batchResult.reason);
        errors.push({
          email,
          error:
            batchResult.reason instanceof Error
              ? batchResult.reason.message
              : 'Unknown email send error',
        });
      });
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${emailResults.length} of ${subscribers.length} subscribers`,
      subscriberCount: subscribers.length,
      sent: emailResults.length,
      failed: errors.length,
      errors: errors.length > 0 ? errors : undefined,
      post: latestPostSummary,
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending newsletter' },
      { status: 500 }
    );
  }
}
