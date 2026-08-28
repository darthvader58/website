import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getTopTracks } from '@/app/lib/spotify';

export const dynamic = 'force-dynamic';

const getCachedTopTracks = unstable_cache(
  async () => {
    const response = await getTopTracks(4, 'short_term');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Spotify responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    return {
      tracks: data.items.map((item: any) => ({
        title: item.name,
        artist: item.artists.map((_artist: any) => _artist.name).join(', '),
        album: item.album.name,
        albumImageUrl: item.album.images[0]?.url ?? '',
        songUrl: item.external_urls.spotify,
        duration: item.duration_ms,
      })),
      timeRange: 'short_term',
      label: 'Last 4 weeks',
    };
  },
  ['spotify-top-tracks-short-term-4'],
  { revalidate: 15 * 60 },
);

export async function GET() {
  try {
    const data = await getCachedTopTracks();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Spotify top tracks error:', error);

    return NextResponse.json(
      { tracks: [], error: 'Unable to load Spotify top tracks right now.' },
      { status: 500 }
    );
  }
}
