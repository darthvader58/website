import { NextResponse } from 'next/server';
import { getTopTracks } from '@/app/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await getTopTracks(4, 'short_term');

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify top tracks request failed:', response.status, errorText);
      return NextResponse.json(
        { tracks: [], error: 'Unable to load Spotify top tracks right now.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    const tracks = data.items.map((item: any) => ({
      title: item.name,
      artist: item.artists.map((_artist: any) => _artist.name).join(', '),
      album: item.album.name,
      albumImageUrl: item.album.images[0]?.url ?? '',
      songUrl: item.external_urls.spotify,
      duration: item.duration_ms,
    }));

    return NextResponse.json({
      tracks,
      timeRange: 'short_term',
      label: 'Last 4 weeks',
    });
  } catch (error) {
    console.error('Spotify top tracks error:', error);

    return NextResponse.json(
      { tracks: [], error: 'Unable to load Spotify top tracks right now.' },
      { status: 500 }
    );
  }
}
