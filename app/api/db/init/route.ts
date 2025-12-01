import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create subscribers table
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        confirmed BOOLEAN DEFAULT true,
        active BOOLEAN DEFAULT true
      );
    `;

    // Create index on email for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
    `;

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully'
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}
