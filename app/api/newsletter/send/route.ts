import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML email template
function generateEmailHTML(title: string, content: string, postUrl?: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; border: 1px solid #334155; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Shashwat Raj</h1>
              <p style="margin: 10px 0 0 0; color: #e9d5ff; font-size: 14px;">Tech Blog Newsletter</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #e2e8f0; font-size: 24px; font-weight: bold;">${title}</h2>
              <div style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                ${content}
              </div>
              ${postUrl ? `
              <table cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td style="background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%); border-radius: 8px; padding: 14px 28px;">
                    <a href="${postUrl}" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">Read Full Post →</a>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 30px; text-align: center; border-top: 1px solid #334155;">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px;">
                You're receiving this because you subscribed to Shashwat Raj's newsletter.
              </p>
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                <a href="https://shashwatraj.com" style="color: #a855f7; text-decoration: none;">Visit Website</a> • 
                <a href="https://github.com/darthvader58" style="color: #a855f7; text-decoration: none;">GitHub</a>
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

export async function POST(request: Request) {
  try {
    const { title, content, postUrl, apiKey } = await request.json();

    // Simple API key protection
    const ADMIN_API_KEY = process.env.NEWSLETTER_API_KEY || 'your-secret-key';
    
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // For Vercel deployment: Newsletter sending is disabled
    // To enable, add database integration (MongoDB, PostgreSQL, Supabase, etc.)
    // Or use SUBSCRIBERS_EMAILS environment variable with comma-separated emails
    
    return NextResponse.json({
      success: false,
      error: 'Newsletter sending requires database integration',
      message: 'File system storage doesn\'t work on Vercel serverless functions. Please integrate a database to store subscribers.',
      note: 'Welcome emails still work when users subscribe!'
    }, { status: 501 });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending newsletter' },
      { status: 500 }
    );
  }
}
