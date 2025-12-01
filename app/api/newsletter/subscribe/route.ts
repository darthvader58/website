import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: 'Shashwat Raj <newsletter@shashwatraj.com>', // Change this to your verified domain
        to: email.toLowerCase(),
        subject: 'Welcome to Shashwat Raj\'s Newsletter!',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; border: 1px solid #334155;">
          <tr>
            <td style="background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Welcome! 🎉</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #e2e8f0; font-size: 24px;">Thanks for subscribing!</h2>
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                You're now part of my newsletter community. You'll receive updates about:
              </p>
              <ul style="color: #cbd5e1; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                <li>New blog posts on tech, ML, and development</li>
                <li>Project updates and insights</li>
                <li>Tips and tutorials</li>
              </ul>
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Stay tuned for great content!
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td style="background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%); border-radius: 8px; padding: 14px 28px;">
                    <a href="https://shashwatraj.com/blog" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Visit Blog →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1e293b; padding: 20px; text-align: center; border-top: 1px solid #334155; border-radius: 0 0 16px 16px;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                <a href="https://shashwatraj.com" style="color: #a855f7; text-decoration: none;">shashwatraj.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
