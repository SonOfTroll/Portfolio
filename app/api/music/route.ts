import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const USER = process.env.NEXT_PUBLIC_LASTFM_USER;
const ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`;

export async function GET() {
  try {
    const res = await fetch(ENDPOINT, { cache: 'no-store' });
    const data = await res.json();
    const track = data.recenttracks.track[0];
    const isPlaying = track['@attr']?.nowplaying === 'true';

    return NextResponse.json({
      isPlaying,
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      image: track.image[3]['#text'], 
      url: track.url
    });
  } catch (e) {
    return NextResponse.json({ isPlaying: false });
  }
}
