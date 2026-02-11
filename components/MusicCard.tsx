'use client'

import { useEffect, useState } from 'react'
import GlassCard from './GlassCard'

interface TrackData {
    isPlaying: boolean
    name?: string
    artist?: string
    album?: string
    image?: string
    url?: string
}

function WaveformVisualizer() {
    return (
        <div className="flex items-end gap-[3px] h-7">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="waveform-bar w-[3px] rounded-full"
                    style={{ backgroundColor: '#00ff41', height: '4px' }}
                />
            ))}
        </div>
    )
}

function VinylDisc({ image }: { image: string }) {
    return (
        <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            {/* Spinning vinyl */}
            <div className="vinyl-spin w-full h-full rounded-full overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image}
                    alt="Album art"
                    className="w-full h-full object-cover rounded-full"
                />
                {/* Center hole */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border border-white/20" />
                </div>
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border border-black/20" />
                <div className="absolute inset-4 rounded-full border border-black/10" />
                <div className="absolute inset-6 rounded-full border border-black/20" />
            </div>
        </div>
    )
}

export default function MusicCard() {
    const [track, setTrack] = useState<TrackData | null>(null)

    const fetchTrack = async () => {
        try {
            const res = await fetch('/api/music')
            const data = await res.json()
            setTrack(data)
        } catch {
            setTrack({ isPlaying: false })
        }
    }

    useEffect(() => {
        fetchTrack()
        const interval = setInterval(fetchTrack, 30000)
        return () => clearInterval(interval)
    }, [])

    return (
        <GlassCard className="col-span-2 row-span-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <div
                    className={`w-2 h-2 rounded-full ${track?.isPlaying ? 'bg-cyber-green status-pulse' : 'bg-white/30'
                        }`}
                />
                <span className="text-xs font-mono tracking-wider uppercase text-white/50">
                    {track?.isPlaying ? 'NOW BROADCASTING' : 'LAST TRANSMISSION'}
                </span>
            </div>

            {track?.name ? (
                <div className="flex items-center gap-5">
                    {/* Vinyl */}
                    {track.image && (
                        <VinylDisc image={track.image} />
                    )}

                    <div className="flex-1 min-w-0">
                        {/* Status text */}
                        <p className="text-xs font-mono text-cyber-green mb-1 tracking-wider">
                            {track.isPlaying ? 'VIBE CHECK' : 'LAST DETECTED'}
                        </p>

                        {/* Song name */}
                        <h3 className="text-lg md:text-xl font-semibold truncate text-white/90">
                            {track.name}
                        </h3>

                        {/* Artist */}
                        <p className="text-sm text-white/50 truncate mt-1">
                            by {track.artist}
                        </p>

                        {/* Waveform */}
                        {track.isPlaying && (
                            <div className="mt-3">
                                <WaveformVisualizer />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-20">
                    <span className="text-sm font-mono text-white/30">SCANNING FREQUENCIES...</span>
                </div>
            )}
        </GlassCard>
    )
}
