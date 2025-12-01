import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sql } from '@vercel/postgres';
import { generateWelcomeEmail } from '@/app/lib/email-templates';

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

    // Check if already subscribed
    const existing = await sql`
      SELECT email, active FROM subscribers WHERE email = ${email.toLowerCase()}
    `;

    if (existing.rows.length > 0) {
      // If inactive, reactivate the subscription
      if (!existing.rows[0].active) {
        await sql`
          UPDATE subscribers 
          SET active = true, subscribed_at = CURRENT_TIMESTAMP
          WHERE email = ${email.toLowerCase()}
        `;
      } else {
        // Already active
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      }
    } else {
      // Add new subscriber to database
      await sql`
        INSERT INTO subscribers (email, confirmed, active)
        VALUES (${email.toLowerCase()}, true, true)
      `;
    }


    // Send welcome email
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured');
      }
      
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: 'Shashwat Raj <newsletter@shashwatraj.com>',
        to: email.toLowerCase(),
        subject: 'Welcome to Shashwat\'s Newsletter',
        html: generateWelcomeEmail(),
      });
      
      console.log('Welcome email sent successfully:', result);
      
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!',
        emailSent: true,
        emailId: result.data?.id
      });
    } catch (emailError: any) {
      console.error('Failed to send welcome email:', emailError);
      
      return NextResponse.json({
        success: false,
        message: 'Failed to send welcome email',
        error: emailError.message,
        emailSent: false
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
