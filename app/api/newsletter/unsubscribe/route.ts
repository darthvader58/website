import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Set active to false instead of deleting
    const result = await sql`
      UPDATE subscribers 
      SET active = false 
      WHERE email = ${email.toLowerCase()}
      RETURNING email
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Email not found in subscribers list' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
