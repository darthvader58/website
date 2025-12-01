import { NextResponse } from 'next/server';
import { Resend } from 'resend';
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
