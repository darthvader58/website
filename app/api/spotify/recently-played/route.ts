import { NextResponse } from 'next/server';
import { getRecentlyPlayed } from '@/app/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await getRecentlyPlayed();

  if (response.status > 400) {
    return NextResponse.json({ tracks: [] });
  }

  const data = await response.json();

  const tracks = data.items.map((item: any) => ({
    title: item.track.name,
    artist: item.track.artists.map((_artist: any) => _artist.name).join(', '),
    album: item.track.album.name,
    albumImageUrl: item.track.album.images[0].url,
    songUrl: item.track.external_urls.spotify,
    duration: item.track.duration_ms,
    playedAt: item.played_at,
  }));

  return NextResponse.json({ tracks });
}
