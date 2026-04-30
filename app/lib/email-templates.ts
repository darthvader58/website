import { formatBlogDate, type BlogPost } from '@/app/lib/blog'

const SITE_URL = 'https://shashwatraj.com'

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

function getBlogPostEmailSubject(post: BlogPost) {
  return `${post.issueLabel}: ${post.title}`
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
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #ffffff; color: #1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width: 580px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 0 0 32px 0; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.5px;">
                Your Shash is Back!
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 15px; color: #666666; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Build, Explore, Discuss and Have Fun!
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 0;">
              <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">
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
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #ffffff; color: #1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width: 580px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 0 0 32px 0; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.5px;">
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
              <h2 style="margin: 0; font-size: 32px; font-weight: 700; color: #1a1a1a; line-height: 1.2; letter-spacing: -0.5px;">
                ${title}
              </h2>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <div style="font-size: 18px; line-height: 1.6; color: #1a1a1a;">
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
</head>
<body style="margin: 0; padding: 0; background-color: #f7f1ea; color: #171717; font-family: Georgia, 'Times New Roman', serif;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
    ${previewText}
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(180deg, #f7f1ea 0%, #f5efe7 100%);">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table width="620" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #fffdf8; border: 1px solid #e7ddd1; border-radius: 24px; overflow: hidden; box-shadow: 0 16px 48px rgba(46, 16, 101, 0.08);">
          <tr>
            <td style="padding: 20px 24px; background: linear-gradient(135deg, #231942 0%, #5e2b97 55%, #ff6b6b 100%);">
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #fef3c7;">
                ${post.issueLabel}
              </p>
              <p style="margin: 10px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; line-height: 1.6; color: #f5e9ff;">
                Fresh off the blog: professional thoughts, mildly unhinged side quests, and one new post worth opening in a proper tab.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px 32px 8px 32px;">
              <p style="margin: 0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #8b5cf6;">
                Shashwat Raj
              </p>
              <h1 style="margin: 0; font-size: 38px; line-height: 1.08; letter-spacing: -0.04em; color: #171717;">
                ${post.title}
              </h1>
              <p style="margin: 16px 0 0 0; font-size: 20px; line-height: 1.6; color: #4b5563;">
                ${post.subtitle}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 32px 0 32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 16px 0 0;">
                    <span style="display: inline-block; padding: 8px 14px; border-radius: 999px; background-color: #f3e8ff; color: #6d28d9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; font-weight: 600;">
                      ${post.category}
                    </span>
                  </td>
                  <td style="padding: 0 16px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #6b7280;">
                    ${publishedLabel}
                  </td>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #6b7280;">
                    ${post.readTime}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px 32px 0 32px;">
              <p style="margin: 0; font-size: 19px; line-height: 1.8; color: #1f2937;">
                ${leadParagraph}
              </p>
              <p style="margin: 22px 0 0 0; font-size: 18px; line-height: 1.8; color: #374151;">
                ${supportingParagraph}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px 32px 0 32px;">
              <div style="padding: 24px; background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 20px;">
                <p style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #c2410c;">
                  Why This One Is Worth Your Click
                </p>
                <p style="margin: 0; font-size: 18px; line-height: 1.8; color: #431407;">
                  ${post.excerpt}
                </p>
              </div>
            </td>
          </tr>

          ${headings.length > 0 ? `
          <tr>
            <td style="padding: 28px 32px 0 32px;">
              <p style="margin: 0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed;">
                Inside This Post
              </p>
              <ul style="margin: 0; padding-left: 22px; color: #1f2937;">
                ${headings
                  .map(
                    (heading) => `
                  <li style="margin: 0 0 12px 0; font-size: 18px; line-height: 1.6;">
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
            <td style="padding: 28px 32px 0 32px;">
              <div style="padding: 24px 24px 24px 28px; border-left: 4px solid #8b5cf6; background-color: #faf5ff; border-radius: 0 18px 18px 0;">
                <p style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed;">
                  A Line From The Post
                </p>
                <p style="margin: 0; font-size: 21px; line-height: 1.7; color: #3b0764;">
                  "${quote}"
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          <tr>
            <td style="padding: 32px 32px 0 32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 999px; background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);">
                    <a href="${postUrl}" style="display: inline-block; padding: 16px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none;">
                      Read the full post
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 18px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; line-height: 1.7; color: #6b7280;">
                Or copy this into your browser like a civilized internet archaeologist:<br>
                <a href="${postUrl}" style="color: #7c3aed; text-decoration: none;">${postUrl}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0; font-size: 18px; line-height: 1.8; color: #1f2937;">
                Thanks for reading,<br>
                <strong>Shash</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 32px 32px 32px; border-top: 1px solid #ece4d8; background-color: #fffaf3;">
              <p style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #6b7280;">
                You're receiving this because you subscribed to Shashwat Raj's newsletter.
              </p>
              <p style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #6b7280;">
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
