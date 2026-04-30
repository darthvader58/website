const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=3';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';

type SpotifyTimeRange = 'short_term' | 'medium_term' | 'long_term';

function getSpotifyCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify client credentials are missing.');
  }

  if (!refreshToken || refreshToken === 'your_refresh_token_here') {
    throw new Error('SPOTIFY_REFRESH_TOKEN is missing. User-specific Spotify data requires a refresh token.');
  }

  return { clientId, clientSecret, refreshToken };
}

const getAccessToken = async () => {
  const { clientId, clientSecret, refreshToken } = getSpotifyCredentials();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify token refresh failed (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<{ access_token: string }>;
};

const getSpotifyResource = async (endpoint: string) => {
  const { access_token } = await getAccessToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
};

export const getNowPlaying = async () => {
  return getSpotifyResource(NOW_PLAYING_ENDPOINT);
};

export const getRecentlyPlayed = async () => {
  return getSpotifyResource(RECENTLY_PLAYED_ENDPOINT);
};

export const getTopTracks = async (
  limit = 4,
  timeRange: SpotifyTimeRange = 'short_term'
) => {
  const endpoint = `${TOP_TRACKS_ENDPOINT}?limit=${limit}&time_range=${timeRange}`;
  return getSpotifyResource(endpoint);
};
