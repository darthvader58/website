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
  isPlaying?: boolean;
  progress?: number;
}

// Hardcoded fallback tracks
const FALLBACK_TRACKS: Track[] = [
  {
    title: "Self Love",
    artist: "Metro Boomin",
    albumImageUrl: "https://i.ytimg.com/vi/_3t6Qk2AsVE/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGDcgZSgxMA8=&rs=AOn4CLCFMOQtjTHCArvXV8sbKK-Ou3cOCA",
    songUrl: "https://open.spotify.com/track/0AAMnNeIc6CdnfNU85GwCH?si=001644ec2d4b4855",
    duration: 213000,
    isPlaying: true,
  },
  {
    title: "One More Light",
    artist: "Linkin Park",
    albumImageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Linkin_Park%2C_One_More_Light%2C_album_art_final.jpeg",
    songUrl: "https://open.spotify.com/track/3xXBsjrbG1xQIm1xv1cKOt?si=abc4b71d4b6c4b1c",
    duration: 255000,
  },
  {
    title: "Pink Skies",
    artist: "Zach Bryan",
    albumImageUrl: "https://upload.wikimedia.org/wikipedia/en/5/5d/Zach_Bryan_-_Pink_Skies.png",
    songUrl: "https://open.spotify.com/track/4ZJ4vzLQekI0WntDbanNC7?si=bab214d63fca4319",
    duration: 198000,
  },
  {
    title: "Stitches",
    artist: "Shawn Mendes",
    albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273ea3ef7697cfd5705b8f47521",
    songUrl: "https://open.spotify.com/track/5jsw9uXEGuKyJzs0boZ1bT?si=9e636d7370de4424",
    duration: 207000,
  },
];

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const SongCard = ({ track }: { track: Track }) => (
  <a 
    href={track.songUrl} 
    target="_blank" 
    rel="noopener noreferrer"
    className="block group"
  >
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:from-slate-800 hover:to-slate-700 transition-all duration-300 border border-slate-700/50">
      <div className="relative">
        <img 
          src={track.albumImageUrl} 
          alt={`${track.title} album cover`}
          className="w-16 h-16 rounded-lg shadow-lg"
        />
        {track.isPlaying && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-slate-100 font-semibold text-lg truncate">{track.title}</h3>
        <p className="text-slate-400 text-sm truncate">{track.artist}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-slate-400 text-sm">{formatDuration(track.duration)}</span>
        <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
          <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="19" cy="12" r="2"/>
          </svg>
        </button>
        <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl">
          <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
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
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [useHardcoded, setUseHardcoded] = useState(false);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        // Fetch now playing
        const nowPlayingRes = await fetch('/api/spotify/now-playing');
        const nowPlayingData = await nowPlayingRes.json();
        
        if (nowPlayingData.isPlaying) {
          setNowPlaying({
            title: nowPlayingData.title,
            artist: nowPlayingData.artist,
            albumImageUrl: nowPlayingData.albumImageUrl,
            songUrl: nowPlayingData.songUrl,
            duration: nowPlayingData.duration,
            isPlaying: true,
            progress: nowPlayingData.progress,
          });
        }

        // Fetch recently played
        const recentRes = await fetch('/api/spotify/recently-played');
        const recentData = await recentRes.json();
        
        // If no data from API, use hardcoded
        if (!nowPlayingData.isPlaying && (!recentData.tracks || recentData.tracks.length === 0)) {
          setUseHardcoded(true);
        } else {
          setRecentTracks(recentData.tracks || []);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setUseHardcoded(true);
        setLoading(false);
      }
    };

    fetchSpotifyData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold text-slate-100">Music is love!</h2>
        </div>
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  // Use hardcoded tracks if API is not connected
  if (useHardcoded) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-slate-100">
            Music is love!
            <span className="text-sm text-green-500 ml-3">● Listening to</span>
          </h2>
        </div>
        
        <div className="space-y-4">
          {FALLBACK_TRACKS.map((track, index) => (
            <SongCard key={index} track={track} />
          ))}
        </div>
      </div>
    );
  }

  const displayTracks = nowPlaying 
    ? [nowPlaying, ...recentTracks.slice(0, 2)]
    : recentTracks.slice(0, 3);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-100">
          spotify picks
          {nowPlaying && <span className="text-sm text-green-500 ml-3">● Now Playing</span>}
        </h2>
      </div>
      
      <div className="space-y-4">
        {displayTracks.map((track, index) => (
          <SongCard key={index} track={track} />
        ))}
      </div>
    </div>
  );
}
