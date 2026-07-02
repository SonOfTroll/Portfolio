import { NextResponse } from 'next/server';

const API_KEY = process.env.LASTFM_API_KEY;
const USER = process.env.LASTFM_USER;

export async function GET() {
  if (!API_KEY || !USER) {
    return NextResponse.json({ isPlaying: false });
  }

  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(USER)}&api_key=${API_KEY}&format=json&limit=1`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    const data = await res.json();
    const track = data?.recenttracks?.track?.[0];

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = track['@attr']?.nowplaying === 'true';

    return NextResponse.json({
      isPlaying,
      name: track.name,
      artist: track.artist?.['#text'],
      album: track.album?.['#text'],
      image: track.image?.[3]?.['#text'],
      url: track.url,
    });
  } catch (e) {
    return NextResponse.json({ isPlaying: false });
  }
}
