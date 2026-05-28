import { NextResponse } from 'next/server';
import { ensureNewsletterTables } from '@/app/lib/newsletter';

export async function GET(request: Request) {
  try {
    const adminApiKey = process.env.NEWSLETTER_API_KEY;
    const authHeader = request.headers.get('authorization');

    if (!adminApiKey) {
      return NextResponse.json({
        error: 'NEWSLETTER_API_KEY is not configured'
      }, { status: 500 });
    }

    if (authHeader !== `Bearer ${adminApiKey}`) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    await ensureNewsletterTables();

    return NextResponse.json({
      success: true,
      message: 'Newsletter tables initialized successfully'
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}
