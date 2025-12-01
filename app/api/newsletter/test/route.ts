import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        error: 'RESEND_API_KEY environment variable is not set',
        hasKey: false
      }, { status: 500 });
    }

    // Try to initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Try to send a test email
    const result = await resend.emails.send({
      from: 'Shashwat Raj <onboarding@resend.dev>',
      to: 'delivered@resend.dev', // Resend's test email
      subject: 'Test Email',
      html: '<p>This is a test email</p>',
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      result: result,
      hasKey: true,
      keyPrefix: process.env.RESEND_API_KEY?.substring(0, 8) + '...'
    });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      details: error.toString(),
      hasKey: !!process.env.RESEND_API_KEY
    }, { status: 500 });
  }
}
