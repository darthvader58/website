import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        error: 'RESEND_API_KEY environment variable is not set',
        hasKey: false,
        allEnvVars: Object.keys(process.env).filter(k => k.includes('RESEND'))
      }, { status: 500 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    
    // Validate API key format
    if (!apiKey.startsWith('re_')) {
      return NextResponse.json({
        error: 'Invalid API key format. Should start with "re_"',
        hasKey: true,
        keyPrefix: apiKey.substring(0, 5) + '...'
      }, { status: 500 });
    }

    // Try to initialize Resend
    const resend = new Resend(apiKey);
    
    // Try to send a test email
    const result = await resend.emails.send({
      from: 'Shashwat Raj <onboarding@resend.dev>',
      to: 'delivered@resend.dev', // Resend's test email
      subject: 'Test Email from Vercel',
      html: '<p>This is a test email to verify Resend integration</p>',
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully! Check Resend dashboard.',
      emailId: result.data?.id,
      hasKey: true,
      keyPrefix: apiKey.substring(0, 8) + '...',
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev'
    });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      details: error.toString(),
      name: error.name,
      hasKey: !!process.env.RESEND_API_KEY,
      keyPrefix: process.env.RESEND_API_KEY?.substring(0, 8) + '...'
    }, { status: 500 });
  }
}
