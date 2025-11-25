import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    
    // Check if gallery directory exists
    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files from gallery directory
    const files = fs.readdirSync(galleryPath);
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => `/gallery/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ images: [] });
  }
}
