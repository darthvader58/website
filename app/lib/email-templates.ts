import { formatBlogDate, type BlogPost } from '@/app/lib/blog'

const SITE_URL = 'https://shashwatraj.com'
const AUTHOR_NAME = 'Shashwat Raj'
const AUTHOR_AVATAR_URL = `${SITE_URL}/images/Myself.png`
const RESPONSIVE_EMAIL_STYLES = `
  <style>
    body,
    table,
    td,
    p,
    a,
    h1,
    h2,
    li {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-collapse: collapse;
    }

    .email-responsive-text {
      overflow-wrap: break-word;
      word-break: break-word;
      word-wrap: break-word;
    }

    .email-date-text {
      max-width: 100%;
      overflow-wrap: anywhere;
      word-break: break-word;
      word-wrap: break-word;
      white-space: normal;
    }

    @media screen and (max-width: 640px) {
      .email-outer {
        padding: 24px 12px !important;
      }

      .email-container,
      .email-card {
        max-width: 100% !important;
        width: 100% !important;
      }

      .email-card {
        border-radius: 16px !important;
      }

      .email-pad {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      .email-title {
        font-size: 30px !important;
        line-height: 1.14 !important;
        letter-spacing: 0 !important;
      }

      .email-heading {
        font-size: 26px !important;
        line-height: 1.2 !important;
        letter-spacing: 0 !important;
      }

      .email-subtitle {
        font-size: 18px !important;
        line-height: 1.45 !important;
      }

      .email-body-text,
      .email-body-text p,
      .email-body-text li,
      .email-list-item {
        font-size: 16px !important;
        line-height: 1.65 !important;
      }

      .email-label {
        letter-spacing: 0.08em !important;
      }

      .email-author-cell,
      .email-avatar-cell {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
      }

      .email-avatar-cell {
        padding-top: 16px !important;
      }

      .email-avatar-image {
        width: 56px !important;
        height: 56px !important;
      }

      .email-inline-meta table,
      .email-inline-meta tbody,
      .email-inline-meta tr,
      .email-inline-meta td {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box;
      }

      .email-pill-cell,
      .email-date-cell {
        padding: 0 0 10px 0 !important;
      }

      .email-callout,
      .email-quote-box {
        padding: 18px !important;
        border-radius: 14px !important;
      }

      .email-button-table,
      .email-button-cell {
        width: 100% !important;
      }

      .email-button-link {
        display: block !important;
        text-align: center !important;
      }
    }

    @media screen and (max-width: 420px) {
      .email-outer {
        padding: 16px 8px !important;
      }

      .email-pad {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }

      .email-title {
        font-size: 26px !important;
      }

      .email-subtitle {
        font-size: 16px !important;
      }

      .email-body-text,
      .email-body-text p,
      .email-body-text li,
      .email-list-item {
        font-size: 15px !important;
      }
    }
  </style>
`

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function stripHtml(value: string) {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTagText(html: string, tagName: string) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi')
  const matches = [...html.matchAll(pattern)]

  return matches
    .map((match) => stripHtml(match[1] ?? ''))
    .filter(Boolean)
}

function getPostParagraphs(post: BlogPost) {
  return post.blocks.flatMap((block) => {
    if (block.type !== 'html') {
      return []
    }

    return extractTagText(block.html, 'p')
  })
}

function getPostHeadings(post: BlogPost) {
  return post.blocks.flatMap((block) => {
    if (block.type !== 'html') {
      return []
    }

    return [...extractTagText(block.html, 'h2'), ...extractTagText(block.html, 'h3')]
  })
}

function getPostQuote(post: BlogPost) {
  const quotes: string[] = []

  for (const block of post.blocks) {
    if (block.type !== 'html') {
      continue
    }

    quotes.push(...extractTagText(block.html, 'blockquote'))
  }

  const punchyQuote = quotes.find((quote) => quote.length >= 40 && quote.length <= 180)

  return punchyQuote ?? quotes[0] ?? null
}

function getPostUrl(post: BlogPost) {
  return `${SITE_URL}/blog/${post.slug}`
}

export function getBlogPostEmailSubject(post: BlogPost) {
  return `New on the blog: ${post.title}`
}

// Substack-style email templates

export function generateWelcomeEmail(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
${RESPONSIVE_EMAIL_STYLES}
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #ffffff; color: #1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
    <tr>
      <td class="email-outer" align="center" style="padding: 40px 20px;">
        <table class="email-container" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 0 0 32px 0; border-bottom: 1px solid #e5e5e5;">
              <h1 class="email-heading email-responsive-text" style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: 0;">
                Your Shash is Back!
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 15px; color: #666666; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Build, Explore, Discuss and Have Fun!
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="email-body-text" style="padding: 40px 0;">
              <h2 class="email-heading email-responsive-text" style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">
                Thanks for subscribing!
              </h2>
              
              <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.6; color: #1a1a1a;">
                Hey there! 👋
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.6; color: #1a1a1a;">
                I'm excited to have you here. These blogs are going to be my public rant, discussion and observations about new things happening in the world. 
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 18px; line-height: 1.6; color: #1a1a1a;">
                I write about things I'm working on, lessons I've learned, ideas I'm exploring, and my take on what's trending in the world. Can't promise no spam or banter, but definitely some genuine insights along the way. At the end of each blog, you'll also find some amazing opportunities that might catch your attention, such as internship opportunities, fellowship applications and hackathons/competitions. Dw, you'll also get some underrated book, show and movie recommendations too. 
              </p>
              
              <p style="margin: 0 0 32px 0; font-size: 18px; line-height: 1.6; color: #1a1a1a;">
                In the meantime, feel free to browse my <a href="https://shashwatraj.com/blog" style="color: #7c3aed; text-decoration: none; border-bottom: 1px solid #7c3aed;">latest posts</a> or check out my <a href="https://shashwatraj.com/projects" style="color: #7c3aed; text-decoration: none; border-bottom: 1px solid #7c3aed;">projects</a>.
              </p>
              
              <p style="margin: 0; font-size: 18px; line-height: 1.6; color: #1a1a1a;">
                Thanks for reading,<br>
                <strong style="font-weight: 600;">Shash</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0 0 0; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <a href="https://shashwatraj.com" style="color: #999999; text-decoration: none;">shashwatraj.com</a> · 
                <a href="https://github.com/darthvader58" style="color: #999999; text-decoration: none;">GitHub</a> · 
                <a href="https://shashwatraj.com/blog" style="color: #999999; text-decoration: none;">Blog</a>
              </p>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #cccccc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                You're receiving this because you subscribed to Shash's newsletter.
              </p>
              <p style="margin: 0; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <a href="https://shashwatraj.com/unsubscribe" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateNewsletterEmail(title: string, content: string, postUrl?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
${RESPONSIVE_EMAIL_STYLES}
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #ffffff; color: #1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
    <tr>
      <td class="email-outer" align="center" style="padding: 40px 20px;">
        <table class="email-container" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 0 0 32px 0; border-bottom: 1px solid #e5e5e5;">
              <h1 class="email-heading email-responsive-text" style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: 0;">
                Shashwat Raj
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 15px; color: #666666; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Build, Explore, Discuss and Have Fun!
              </p>
            </td>
          </tr>
          
          <!-- Post Title -->
          <tr>
            <td style="padding: 40px 0 24px 0;">
              <h2 class="email-title email-responsive-text" style="margin: 0; font-size: 32px; font-weight: 700; color: #1a1a1a; line-height: 1.2; letter-spacing: 0;">
                ${title}
              </h2>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <div class="email-body-text email-responsive-text" style="font-size: 18px; line-height: 1.6; color: #1a1a1a;">
                ${content}
              </div>
            </td>
          </tr>
          
          ${postUrl ? `
          <!-- Read More Button -->
          <tr>
            <td style="padding: 0 0 40px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #7c3aed; border-radius: 4px; padding: 14px 32px;">
                    <a href="${postUrl}" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: inline-block;">
                      Read full post
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          <!-- Signature -->
          <tr>
            <td style="padding: 0 0 40px 0;">
              <p style="margin: 0; font-size: 18px; line-height: 1.6; color: #1a1a1a;">
                Thanks for reading,<br>
                <strong style="font-weight: 600;">Shashwat</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0 0 0; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <a href="https://shashwatraj.com" style="color: #999999; text-decoration: none;">shashwatraj.com</a> · 
                <a href="https://github.com/darthvader58" style="color: #999999; text-decoration: none;">GitHub</a> · 
                <a href="https://shashwatraj.com/blog" style="color: #999999; text-decoration: none;">Blog</a>
              </p>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #cccccc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                You're receiving this because you subscribed to Shashwat Raj's newsletter.
              </p>
              <p style="margin: 0; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <a href="https://shashwatraj.com/unsubscribe" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateBlogPostNewsletterEmail(post: BlogPost): string {
  const postUrl = getPostUrl(post)
  const publishedLabel = formatBlogDate(post.publishedAt)
  const previewText = `${post.subtitle} ${post.excerpt}`.trim()
  const paragraphs = getPostParagraphs(post)
  const headings = getPostHeadings(post).slice(0, 3)
  const quote = getPostQuote(post)
  const leadParagraph = paragraphs[0] ?? post.excerpt
  const supportingParagraph = paragraphs[1] ?? 'Fresh off the site: a new post with sharp opinions, field notes, and a mildly unreasonable amount of curiosity.'
  const emailSubject = getBlogPostEmailSubject(post)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
${RESPONSIVE_EMAIL_STYLES}
</head>
<body style="margin: 0; padding: 0; background-color: #f7f1ea; color: #171717; font-family: Georgia, 'Times New Roman', serif;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
    ${previewText}
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(180deg, #f7f1ea 0%, #f5efe7 100%);">
    <tr>
      <td class="email-outer" align="center" style="padding: 32px 16px;">
        <table class="email-card" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; width: 100%; background-color: #fffdf8; border: 1px solid #e7ddd1; border-radius: 24px; overflow: hidden; box-shadow: 0 16px 48px rgba(46, 16, 101, 0.08);">
          <tr>
            <td class="email-pad" style="padding: 24px 32px 8px 32px;">
              <div style="height: 1px; background-color: #ddd6ce; margin-bottom: 28px;"></div>
              <h1 class="email-title email-responsive-text" style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 42px; font-weight: 800; line-height: 1.04; letter-spacing: 0; color: #202124;">
                ${post.title}
              </h1>
              <p class="email-subtitle email-responsive-text" style="margin: 18px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 22px; line-height: 1.55; color: #6b7280;">
                ${post.subtitle}
              </p>
            </td>
          </tr>

          <tr>
            <td class="email-pad" style="padding: 20px 32px 0 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="email-author-cell" valign="middle">
                    <p style="margin: 0;">
                      <span class="email-label email-responsive-text" style="display: inline-block; padding: 4px 8px; background-color: #ffe08a; color: #202124; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
                        ${AUTHOR_NAME}
                      </span>
                    </p>
                    <p class="email-date-text" style="margin: 14px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #7b7b7b;">
                      ${publishedLabel} · ${post.readTime}
                    </p>
                  </td>
                  <td class="email-avatar-cell" align="right" valign="middle" style="width: 88px;">
                    <img
                      src="${AUTHOR_AVATAR_URL}"
                      alt="${AUTHOR_NAME}"
                      width="72"
                      height="72"
                      class="email-avatar-image"
                      style="display: block; width: 72px; height: 72px; border-radius: 999px; object-fit: cover;"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="email-pad email-inline-meta" style="padding: 22px 32px 0 32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td class="email-pill-cell" style="padding: 0 16px 0 0;">
                    <span class="email-responsive-text" style="display: inline-block; padding: 8px 14px; border-radius: 999px; background-color: #f3e8ff; color: #6d28d9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; font-weight: 600;">
                      ${post.category}
                    </span>
                  </td>
                  <td class="email-date-cell email-date-text" style="padding: 0 16px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #6b7280;">
                    ${publishedLabel}
                  </td>
                  <td class="email-date-cell email-date-text" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #6b7280;">
                    ${post.readTime}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="email-pad email-body-text" style="padding: 28px 32px 0 32px;">
              <p class="email-responsive-text" style="margin: 0; font-size: 19px; line-height: 1.8; color: #1f2937;">
                ${leadParagraph}
              </p>
              <p class="email-responsive-text" style="margin: 22px 0 0 0; font-size: 18px; line-height: 1.8; color: #374151;">
                ${supportingParagraph}
              </p>
            </td>
          </tr>

          <tr>
            <td class="email-pad" style="padding: 28px 32px 0 32px;">
              <div class="email-callout" style="padding: 24px; background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 20px;">
                <p class="email-label" style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #c2410c;">
                  Why This One Is Worth Your Click
                </p>
                <p class="email-body-text email-responsive-text" style="margin: 0; font-size: 18px; line-height: 1.8; color: #431407;">
                  ${post.excerpt}
                </p>
              </div>
            </td>
          </tr>

          ${headings.length > 0 ? `
          <tr>
            <td class="email-pad" style="padding: 28px 32px 0 32px;">
              <p class="email-label" style="margin: 0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed;">
                Inside This Post
              </p>
              <ul style="margin: 0; padding-left: 22px; color: #1f2937;">
                ${headings
                  .map(
                    (heading) => `
                  <li class="email-list-item email-responsive-text" style="margin: 0 0 12px 0; font-size: 18px; line-height: 1.6;">
                    ${heading}
                  </li>
                `
                  )
                  .join('')}
              </ul>
            </td>
          </tr>
          ` : ''}

          ${quote ? `
          <tr>
            <td class="email-pad" style="padding: 28px 32px 0 32px;">
              <div class="email-quote-box" style="padding: 24px 24px 24px 28px; border-left: 4px solid #8b5cf6; background-color: #faf5ff; border-radius: 0 18px 18px 0;">
                <p class="email-label" style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed;">
                  A Line From The Post
                </p>
                <p class="email-subtitle email-responsive-text" style="margin: 0; font-size: 21px; line-height: 1.7; color: #3b0764;">
                  "${quote}"
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          <tr>
            <td class="email-pad" style="padding: 32px 32px 0 32px;">
              <table class="email-button-table" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="email-button-cell" style="border-radius: 12px; background-color: #1f8f3a;">
                    <a class="email-button-link" href="${postUrl}" style="display: inline-block; padding: 15px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; text-decoration: none;">
                      Read the full post
                    </a>
                  </td>
                </tr>
              </table>
              <p class="email-date-text" style="margin: 16px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; line-height: 1.7; color: #6b7280;">
                Prefer reading in the browser?
                <a href="${postUrl}" style="color: #1f2937; text-decoration: underline; text-underline-offset: 2px;">Open the web version</a>.
              </p>
            </td>
          </tr>

          <tr>
            <td class="email-pad email-body-text" style="padding: 32px;">
              <p class="email-responsive-text" style="margin: 0; font-size: 18px; line-height: 1.8; color: #1f2937;">
                Thanks for reading,<br>
                <strong>Shash</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td class="email-pad" style="padding: 24px 32px 32px 32px; border-top: 1px solid #ece4d8; background-color: #fffaf3;">
              <p class="email-date-text" style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #6b7280;">
                You're receiving this because you subscribed to Shashwat Raj's newsletter.
              </p>
              <p class="email-date-text" style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #6b7280;">
                <a href="${SITE_URL}" style="color: #6b7280; text-decoration: none;">Website</a> ·
                <a href="${SITE_URL}/blog" style="color: #6b7280; text-decoration: none;">Blog</a> ·
                <a href="https://github.com/darthvader58" style="color: #6b7280; text-decoration: none;">GitHub</a>
              </p>
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px;">
                <a href="${SITE_URL}/unsubscribe" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateBlogPostNewsletterText(post: BlogPost): string {
  const postUrl = getPostUrl(post)
  const publishedLabel = formatBlogDate(post.publishedAt)
  const headings = getPostHeadings(post).slice(0, 3)
  const quote = getPostQuote(post)
  const paragraphs = getPostParagraphs(post)
  const leadParagraph = paragraphs[0] ?? post.excerpt
  const supportingParagraph = paragraphs[1] ?? ''

  return [
    `${getBlogPostEmailSubject(post)}`,
    '',
    post.subtitle,
    '',
    `${post.category} · ${publishedLabel} · ${post.readTime}`,
    '',
    leadParagraph,
    supportingParagraph,
    '',
    `Why this one is worth your click: ${post.excerpt}`,
    '',
    ...(headings.length > 0
      ? ['Inside this post:', ...headings.map((heading) => `- ${heading}`), '']
      : []),
    ...(quote ? [`A line from the post: "${quote}"`, ''] : []),
    `Read the full post: ${postUrl}`,
    '',
    'Thanks for reading,',
    'Shash',
  ]
    .filter(Boolean)
    .join('\n')
}
