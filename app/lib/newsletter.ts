import { sql } from '@vercel/postgres'
import { Resend } from 'resend'
import {
  getLatestPublishedBlogPost,
  getPublishedBlogPosts as getPublishedBlogPostsFromBlog,
  type BlogPost,
} from '@/app/lib/blog'
import {
  generateBlogPostNewsletterEmail,
  getBlogPostEmailSubject,
  generateBlogPostNewsletterText,
  generateNewsletterEmail,
} from '@/app/lib/email-templates'

const FROM_EMAIL = 'Shashwat Raj <newsletter@shashwatraj.com>'
const RESEND_BATCH_SIZE = 100

type SendError = {
  email: string | undefined
  error: string
}

type SendSuccess = {
  email: string
  success: true
  id: string | undefined
}

type SubscriberRow = {
  email: string
}

type DeliveryRow = {
  id: number
  subscriber_email: string
}

type DeliverySummaryRow = {
  total_count: number
  sent_count: number
  failed_count: number
  pending_count: number
  processing_count: number
}

export type NewsletterBroadcastStatus =
  | 'pending'
  | 'processing'
  | 'sent'
  | 'partial'
  | 'failed'
  | 'skipped_no_subscribers'

export type NewsletterBroadcast = {
  post_slug: string
  post_title: string
  post_published_at: string
  subject: string
  subscriber_count: number
  sent_count: number
  failed_count: number
  status: NewsletterBroadcastStatus
  last_error: string | null
  sent_at: string | null
}

type SendResult =
  | {
      status: 'pending' | 'processing' | 'sent' | 'partial' | 'failed' | 'skipped_no_subscribers'
      post: BlogPost
      subject: string
      subscriberCount: number
      sent: number
      failed: number
      errors: SendError[]
    }
  | {
      status: 'already_sent'
      post: BlogPost
      broadcast: NewsletterBroadcast
    }
  | {
      status: 'no_post'
    }

let ensureNewsletterTablesPromise: Promise<void> | null = null

function isTerminalBroadcastStatus(status: NewsletterBroadcastStatus) {
  return status === 'sent' || status === 'skipped_no_subscribers'
}

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  return new Resend(process.env.RESEND_API_KEY)
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function getCustomEmailText(title: string, content: string, postUrl?: string) {
  return [title, '', stripHtml(content), postUrl ? `Read more: ${postUrl}` : '']
    .filter(Boolean)
    .join('\n')
}

async function runNewsletterMigrations() {
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      confirmed BOOLEAN DEFAULT true,
      active BOOLEAN DEFAULT true
    );
  `

  await sql`
    CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
  `

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_broadcasts (
      id SERIAL PRIMARY KEY,
      post_slug VARCHAR(255) UNIQUE NOT NULL,
      post_title TEXT NOT NULL,
      post_published_at DATE NOT NULL,
      subject TEXT NOT NULL,
      subscriber_count INTEGER NOT NULL DEFAULT 0,
      sent_count INTEGER NOT NULL DEFAULT 0,
      failed_count INTEGER NOT NULL DEFAULT 0,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      last_error TEXT,
      sent_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS subscriber_count INTEGER NOT NULL DEFAULT 0;
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS sent_count INTEGER NOT NULL DEFAULT 0;
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS failed_count INTEGER NOT NULL DEFAULT 0;
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'pending';
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS last_error TEXT;
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP;
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
  `

  await sql`
    ALTER TABLE newsletter_broadcasts
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
  `

  await sql`
    CREATE INDEX IF NOT EXISTS idx_newsletter_broadcasts_post_slug
    ON newsletter_broadcasts(post_slug);
  `

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_deliveries (
      id SERIAL PRIMARY KEY,
      post_slug VARCHAR(255) NOT NULL,
      subscriber_email VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      resend_email_id TEXT,
      error TEXT,
      last_attempted_at TIMESTAMP,
      sent_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (post_slug, subscriber_email)
    );
  `

  await sql`
    ALTER TABLE newsletter_deliveries
    ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'pending';
  `

  await sql`
    ALTER TABLE newsletter_deliveries
    ADD COLUMN IF NOT EXISTS resend_email_id TEXT;
  `

  await sql`
    ALTER TABLE newsletter_deliveries
    ADD COLUMN IF NOT EXISTS error TEXT;
  `

  await sql`
    ALTER TABLE newsletter_deliveries
    ADD COLUMN IF NOT EXISTS last_attempted_at TIMESTAMP;
  `

  await sql`
    ALTER TABLE newsletter_deliveries
    ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP;
  `

  await sql`
    ALTER TABLE newsletter_deliveries
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
  `

  await sql`
    ALTER TABLE newsletter_deliveries
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
  `

  await sql`
    CREATE INDEX IF NOT EXISTS idx_newsletter_deliveries_post_slug_status
    ON newsletter_deliveries(post_slug, status);
  `
}

export async function ensureNewsletterTables() {
  if (!ensureNewsletterTablesPromise) {
    ensureNewsletterTablesPromise = runNewsletterMigrations().catch((error) => {
      ensureNewsletterTablesPromise = null
      throw error
    })
  }

  await ensureNewsletterTablesPromise
}

async function upsertBroadcast(post: BlogPost, subject: string) {
  await sql`
    INSERT INTO newsletter_broadcasts (
      post_slug,
      post_title,
      post_published_at,
      subject,
      status,
      created_at,
      updated_at
    )
    VALUES (
      ${post.slug},
      ${post.title},
      ${post.publishedAt},
      ${subject},
      'pending',
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
    ON CONFLICT (post_slug) DO UPDATE SET
      post_title = EXCLUDED.post_title,
      post_published_at = EXCLUDED.post_published_at,
      subject = EXCLUDED.subject,
      updated_at = CURRENT_TIMESTAMP
  `
}

async function resetBroadcast(post: BlogPost, subject: string) {
  await sql`
    DELETE FROM newsletter_deliveries
    WHERE post_slug = ${post.slug}
  `

  await sql`
    INSERT INTO newsletter_broadcasts (
      post_slug,
      post_title,
      post_published_at,
      subject,
      subscriber_count,
      sent_count,
      failed_count,
      status,
      last_error,
      sent_at,
      created_at,
      updated_at
    )
    VALUES (
      ${post.slug},
      ${post.title},
      ${post.publishedAt},
      ${subject},
      0,
      0,
      0,
      'pending',
      null,
      null,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
    ON CONFLICT (post_slug) DO UPDATE SET
      post_title = EXCLUDED.post_title,
      post_published_at = EXCLUDED.post_published_at,
      subject = EXCLUDED.subject,
      subscriber_count = 0,
      sent_count = 0,
      failed_count = 0,
      status = 'pending',
      last_error = null,
      sent_at = null,
      updated_at = CURRENT_TIMESTAMP
  `
}

export async function getNewsletterBroadcast(postSlug: string) {
  await ensureNewsletterTables()

  const result = await sql<NewsletterBroadcast>`
    SELECT
      post_slug,
      post_title,
      post_published_at,
      subject,
      subscriber_count,
      sent_count,
      failed_count,
      status,
      last_error,
      sent_at
    FROM newsletter_broadcasts
    WHERE post_slug = ${postSlug}
    LIMIT 1
  `

  return result.rows[0] ?? null
}

async function getActiveSubscribers() {
  await ensureNewsletterTables()

  const result = await sql<SubscriberRow>`
    SELECT email
    FROM subscribers
    WHERE active = true
    ORDER BY subscribed_at ASC
  `

  return result.rows
}

async function seedDeliveriesForPost(postSlug: string) {
  await sql`
    INSERT INTO newsletter_deliveries (
      post_slug,
      subscriber_email,
      status,
      created_at,
      updated_at
    )
    SELECT
      ${postSlug},
      subscribers.email,
      'pending',
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    FROM subscribers
    WHERE subscribers.active = true
    ON CONFLICT (post_slug, subscriber_email) DO NOTHING
  `
}

async function claimDeliveriesForPost(postSlug: string) {
  const result = await sql<DeliveryRow>`
    WITH claimable AS (
      SELECT id
      FROM newsletter_deliveries
      WHERE post_slug = ${postSlug}
        AND (
          status = 'pending'
          OR status = 'failed'
          OR (
            status = 'processing'
            AND last_attempted_at < CURRENT_TIMESTAMP - INTERVAL '15 minutes'
          )
        )
      ORDER BY id
      LIMIT ${RESEND_BATCH_SIZE}
      FOR UPDATE SKIP LOCKED
    )
    UPDATE newsletter_deliveries
    SET
      status = 'processing',
      last_attempted_at = CURRENT_TIMESTAMP,
      error = null,
      updated_at = CURRENT_TIMESTAMP
    WHERE id IN (SELECT id FROM claimable)
    RETURNING id, subscriber_email
  `

  return result.rows
}

async function markDeliverySent(id: number, resendEmailId?: string) {
  await sql`
    UPDATE newsletter_deliveries
    SET
      status = 'sent',
      resend_email_id = ${resendEmailId ?? null},
      error = null,
      sent_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

async function markDeliveryFailed(id: number, errorMessage: string) {
  await sql`
    UPDATE newsletter_deliveries
    SET
      status = 'failed',
      error = ${errorMessage},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

function getResendErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }

  return 'Unknown email send error'
}

async function sendSingleEmailWithResend({
  resend,
  to,
  subject,
  html,
  text,
  tags,
}: {
  resend: Resend
  to: string
  subject: string
  html: string
  text: string
  tags?: { name: string; value: string }[]
}) {
  const response = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
    text,
    tags,
  })

    if (response.error) {
      throw new Error(response.error.message)
    }

    if (!response.data?.id) {
      throw new Error('Resend did not return an email id')
    }

    return response.data.id
}

async function sendDeliveryBatch({
  deliveries,
  subject,
  html,
  text,
  tags,
}: {
  deliveries: DeliveryRow[]
  subject: string
  html: string
  text: string
  tags?: { name: string; value: string }[]
}) {
  const resend = getResendClient()
  const errors: SendError[] = []
  const successes: SendSuccess[] = []

  try {
    const response = await resend.batch.send(
      deliveries.map((delivery) => ({
        from: FROM_EMAIL,
        to: delivery.subscriber_email,
        subject,
        html,
        text,
        tags,
      }))
    )

      if (response.error) {
        throw new Error(response.error.message)
      }

      const emailIds = response.data?.data

      if (!emailIds) {
        throw new Error('Resend batch send returned no email ids')
      }

      await Promise.all(
        deliveries.map(async (delivery, index) => {
        const resendEmailId = emailIds[index]?.id
        await markDeliverySent(delivery.id, resendEmailId)
        successes.push({
          email: delivery.subscriber_email,
          success: true,
          id: resendEmailId,
        })
      })
    )
  } catch (batchError) {
    console.error('Resend batch send failed, falling back to individual sends:', batchError)

    for (const delivery of deliveries) {
      try {
        const resendEmailId = await sendSingleEmailWithResend({
          resend,
          to: delivery.subscriber_email,
          subject,
          html,
          text,
          tags,
        })

        await markDeliverySent(delivery.id, resendEmailId)
        successes.push({
          email: delivery.subscriber_email,
          success: true,
          id: resendEmailId,
        })
      } catch (singleSendError) {
        const errorMessage = getResendErrorMessage(singleSendError)
        await markDeliveryFailed(delivery.id, errorMessage)
        errors.push({
          email: delivery.subscriber_email,
          error: errorMessage,
        })
      }
    }
  }

  return {
    successes,
    errors,
  }
}

async function sendCustomEmailBatch({
  subscribers,
  subject,
  html,
  text,
}: {
  subscribers: SubscriberRow[]
  subject: string
  html: string
  text: string
}) {
  const resend = getResendClient()
  const emailResults: SendSuccess[] = []
  const errors: SendError[] = []

  for (let index = 0; index < subscribers.length; index += RESEND_BATCH_SIZE) {
    const batch = subscribers.slice(index, index + RESEND_BATCH_SIZE)

    try {
      const response = await resend.batch.send(
        batch.map((subscriber) => ({
          from: FROM_EMAIL,
          to: subscriber.email,
          subject,
          html,
          text,
        }))
      )

      if (response.error) {
        throw new Error(response.error.message)
      }

      const emailIds = response.data?.data

      if (!emailIds) {
        throw new Error('Resend batch send returned no email ids')
      }

      batch.forEach((subscriber, batchIndex) => {
        emailResults.push({
          email: subscriber.email,
          success: true,
          id: emailIds[batchIndex]?.id,
        })
      })
    } catch (batchError) {
      console.error('Custom newsletter batch send failed, retrying individually:', batchError)

      for (const subscriber of batch) {
        try {
          const resendEmailId = await sendSingleEmailWithResend({
            resend,
            to: subscriber.email,
            subject,
            html,
            text,
          })

          emailResults.push({
            email: subscriber.email,
            success: true,
            id: resendEmailId,
          })
        } catch (singleSendError) {
          errors.push({
            email: subscriber.email,
            error: getResendErrorMessage(singleSendError),
          })
        }
      }
    }
  }

  return {
    emailResults,
    errors,
  }
}

async function getDeliverySummary(postSlug: string) {
  const summaryResult = await sql<DeliverySummaryRow>`
    SELECT
      COUNT(*)::int AS total_count,
      COUNT(*) FILTER (WHERE status = 'sent')::int AS sent_count,
      COUNT(*) FILTER (WHERE status = 'failed')::int AS failed_count,
      COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_count,
      COUNT(*) FILTER (WHERE status = 'processing')::int AS processing_count
    FROM newsletter_deliveries
    WHERE post_slug = ${postSlug}
  `

  const summary = summaryResult.rows[0] ?? {
    total_count: 0,
    sent_count: 0,
    failed_count: 0,
    pending_count: 0,
    processing_count: 0,
  }

  const lastErrorResult = await sql<{ error: string | null }>`
    SELECT error
    FROM newsletter_deliveries
    WHERE post_slug = ${postSlug}
      AND status = 'failed'
      AND error IS NOT NULL
    ORDER BY updated_at DESC, id DESC
    LIMIT 1
  `

  return {
    ...summary,
    last_error: lastErrorResult.rows[0]?.error ?? null,
  }
}

async function refreshBroadcastStatus(post: BlogPost, subject: string) {
  const summary = await getDeliverySummary(post.slug)
  const existingBroadcast = await getNewsletterBroadcast(post.slug)

  let status: NewsletterBroadcastStatus = 'pending'

  if (summary.total_count === 0) {
    status = 'skipped_no_subscribers'
  } else if (summary.pending_count > 0 || summary.processing_count > 0) {
    status = 'processing'
  } else if (summary.sent_count === summary.total_count) {
    status = 'sent'
  } else if (summary.sent_count > 0) {
    status = 'partial'
  } else if (summary.failed_count > 0) {
    status = 'failed'
  }

  const sentAt =
    status === 'sent' || status === 'skipped_no_subscribers'
      ? existingBroadcast?.sent_at ?? new Date().toISOString()
      : null

  await sql`
    INSERT INTO newsletter_broadcasts (
      post_slug,
      post_title,
      post_published_at,
      subject,
      subscriber_count,
      sent_count,
      failed_count,
      status,
      last_error,
      sent_at,
      created_at,
      updated_at
    )
    VALUES (
      ${post.slug},
      ${post.title},
      ${post.publishedAt},
      ${subject},
      ${summary.total_count},
      ${summary.sent_count},
      ${summary.failed_count},
      ${status},
      ${summary.last_error},
      ${sentAt},
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
    ON CONFLICT (post_slug) DO UPDATE SET
      post_title = EXCLUDED.post_title,
      post_published_at = EXCLUDED.post_published_at,
      subject = EXCLUDED.subject,
      subscriber_count = EXCLUDED.subscriber_count,
      sent_count = EXCLUDED.sent_count,
      failed_count = EXCLUDED.failed_count,
      status = EXCLUDED.status,
      last_error = EXCLUDED.last_error,
      sent_at = EXCLUDED.sent_at,
      updated_at = CURRENT_TIMESTAMP
  `

  return {
    status,
    subscriberCount: summary.total_count,
    sent: summary.sent_count,
    failed: summary.failed_count,
    lastError: summary.last_error,
  }
}

function getPublishedBlogPostsForNewsletter() {
  return getPublishedBlogPostsFromBlog().sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))
}

export async function sendCustomNewsletter({
  title,
  content,
  postUrl,
}: {
  title: string
  content: string
  postUrl?: string
}) {
  const subject = title
  const html = generateNewsletterEmail(title, content, postUrl)
  const text = getCustomEmailText(title, content, postUrl)
  const subscribers = await getActiveSubscribers()
  const { emailResults, errors } = await sendCustomEmailBatch({
    subscribers,
    subject,
    html,
    text,
  })

  return {
    subject,
    subscriberCount: subscribers.length,
    sent: emailResults.length,
    failed: errors.length,
    errors,
  }
}

export async function sendBlogPostNewsletter(
  post: BlogPost,
  options?: { force?: boolean; subjectOverride?: string }
): Promise<SendResult> {
  await ensureNewsletterTables()

  const subject = options?.subjectOverride?.trim() || getBlogPostEmailSubject(post)

  if (options?.force) {
    await resetBroadcast(post, subject)
  } else {
    await upsertBroadcast(post, subject)
    const existingBroadcast = await getNewsletterBroadcast(post.slug)

    if (existingBroadcast && isTerminalBroadcastStatus(existingBroadcast.status)) {
      return {
        status: 'already_sent',
        post,
        broadcast: existingBroadcast,
      }
    }
  }

  await seedDeliveriesForPost(post.slug)

  const html = generateBlogPostNewsletterEmail(post)
  const text = generateBlogPostNewsletterText(post)
  const errors: SendError[] = []

  while (true) {
    const claimedDeliveries = await claimDeliveriesForPost(post.slug)

    if (claimedDeliveries.length === 0) {
      break
    }

    const result = await sendDeliveryBatch({
      deliveries: claimedDeliveries,
      subject,
      html,
      text,
      tags: [
        { name: 'source', value: 'blog-newsletter' },
        { name: 'post_slug', value: post.slug },
      ],
    })

    errors.push(...result.errors)
  }

  const summary = await refreshBroadcastStatus(post, subject)

  return {
    status: summary.status,
    post,
    subject,
    subscriberCount: summary.subscriberCount,
    sent: summary.sent,
    failed: summary.failed,
    errors,
  }
}

export async function sendLatestBlogPostNewsletter(options?: {
  force?: boolean
  subjectOverride?: string
}) {
  const latestPost = getLatestPublishedBlogPost()

  if (!latestPost) {
    return {
      status: 'no_post' as const,
    }
  }

  return sendBlogPostNewsletter(latestPost, options)
}

export async function sendLatestBlogPostTestEmail(toEmail: string, subjectOverride?: string) {
  const latestPost = getLatestPublishedBlogPost()

  if (!latestPost) {
    return {
      status: 'no_post' as const,
    }
  }

  const subject = subjectOverride?.trim() || getBlogPostEmailSubject(latestPost)
  const html = generateBlogPostNewsletterEmail(latestPost)
  const text = generateBlogPostNewsletterText(latestPost)
  const resend = getResendClient()

  const emailId = await sendSingleEmailWithResend({
    resend,
    to: toEmail,
    subject,
    html,
    text,
    tags: [
      { name: 'source', value: 'blog-newsletter-test' },
      { name: 'post_slug', value: latestPost.slug },
    ],
  })

  return {
    status: 'sent' as const,
    post: latestPost,
    subject,
    toEmail,
    emailId,
  }
}

export async function sendPendingBlogPostNewsletters() {
  const posts = getPublishedBlogPostsForNewsletter()
  const results: Awaited<ReturnType<typeof sendBlogPostNewsletter>>[] = []

  for (const post of posts) {
    const result = await sendBlogPostNewsletter(post)

    if (result.status === 'already_sent') {
      continue
    }

    results.push(result)
  }

  return results
}
