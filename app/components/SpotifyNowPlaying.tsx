'use client';

import { useState, useEffect } from 'react';

const SpotifyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

interface Track {
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  duration: number;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const SongCard = ({ track, index }: { track: Track; index: number }) => (
  <a 
    href={track.songUrl} 
    target="_blank" 
    rel="noopener noreferrer"
    className="block group spotify-card"
  >
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-300 border-2 border-slate-700 dark:border-slate-700/50 shadow-md hover:shadow-lg">
      <div className="relative">
        <img 
          src={track.albumImageUrl} 
          alt={`${track.title} album cover`}
          className="w-16 h-16 rounded-lg shadow-lg"
        />
        <div className="absolute -bottom-1 -right-1 min-w-6 h-6 px-1 bg-green-500 rounded-full flex items-center justify-center shadow-lg text-[10px] font-semibold text-white">
          #{index + 1}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg truncate">{track.title}</h3>
        <p className="text-sm truncate opacity-80">{track.artist}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium opacity-80">{formatDuration(track.duration)}</span>
        <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shadow-sm">
          <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="19" cy="12" r="2"/>
          </svg>
        </button>
        <button className="w-12 h-12 rounded-full bg-purple-600 dark:bg-white flex items-center justify-center hover:scale-105 hover:bg-purple-700 dark:hover:bg-slate-100 transition-all shadow-lg group-hover:shadow-xl">
          <svg className="w-6 h-6 text-white dark:text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      <div className="absolute top-4 right-4">
        <SpotifyIcon />
      </div>
    </div>
  </a>
);

export default function SpotifyNowPlaying() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRangeLabel, setTimeRangeLabel] = useState('Last 4 weeks');

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const topTracksRes = await fetch('/api/spotify/top-tracks', {
          cache: 'no-store',
        });
        const topTracksData = await topTracksRes.json();

        if (!topTracksRes.ok) {
          throw new Error(topTracksData.error || 'Unable to load Spotify top tracks right now.');
        }

        setTopTracks(topTracksData.tracks || []);
        setTimeRangeLabel(topTracksData.label || 'Last 4 weeks');
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setTopTracks([]);
        setError('Spotify top tracks are unavailable right now.');
        setLoading(false);
      }
    };

    fetchSpotifyData();
    
    // Top tracks update more slowly than playback state.
    const interval = setInterval(fetchSpotifyData, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Current top tracks</h2>
        </div>
        <div className="text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    );
  }

  if (error || topTracks.length === 0) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Current top tracks
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5 text-slate-400">
          {error || 'Spotify top tracks are unavailable right now.'}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Current top tracks
          <span className="text-sm text-green-500 ml-3">● {timeRangeLabel}</span>
        </h2>
      </div>
      
      <div className="space-y-4">
        {topTracks.map((track, index) => (
          <SongCard key={track.songUrl} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}
