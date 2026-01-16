import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'Shashwat_Raj_GCSPMeeting_poster.pdf');
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Shashwat_Raj_GCSPMeeting_poster.pdf"',
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
