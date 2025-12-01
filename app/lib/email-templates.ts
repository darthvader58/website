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
