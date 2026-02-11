'use client'

import { useState } from 'react'
import GlassCard from './GlassCard'

const SOCIALS = [
    {
        platform: 'GitHub',
        handle: '@SonOfTroll',
        url: 'https://github.com/SonOfTroll',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        platform: 'LinkedIn',
        handle: '@val3nt1n3-d4c',
        url: 'https://linkedin.com/in/val3nt1n3-d4c',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        platform: 'Telegram',
        handle: '@SonOfTroll',
        url: 'https://t.me/SonOfTroll',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
        ),
    },
    {
        platform: 'Email',
        handle: 'progb4pawgs@gmail.com',
        url: 'mailto:progb4pawgs@gmail.com',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
        ),
    },
]

export default function CommsCard() {
    const [hoveredHandle, setHoveredHandle] = useState<string | null>(null)

    return (
        <GlassCard className="col-span-2 row-span-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs font-mono tracking-wider uppercase text-white/50">
                    COMMS & BASE
                </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Minimalist Dehradun Map */}
                <div className="flex-1 min-w-0 relative">
                    <svg viewBox="0 0 200 120" className="w-full h-auto opacity-30">
                        {/* Simplified Dehradun terrain */}
                        <defs>
                            <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="100%" stopColor="rgba(0,255,65,0.05)" />
                            </linearGradient>
                        </defs>
                        {/* Mountain silhouettes */}
                        <path d="M0 80 L20 45 L40 65 L55 30 L70 55 L90 20 L110 50 L130 35 L150 55 L170 25 L190 45 L200 60 L200 120 L0 120Z" fill="url(#mapGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        {/* Grid lines */}
                        <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                        <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                        <line x1="50" y1="0" x2="50" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                        <line x1="100" y1="0" x2="100" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                        <line x1="150" y1="0" x2="150" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                        {/* Location pin */}
                        <circle cx="100" cy="65" r="3" fill="#00ff41" opacity="0.8" />
                        <circle cx="100" cy="65" r="6" fill="none" stroke="#00ff41" strokeWidth="0.5" opacity="0.4" />
                        <circle cx="100" cy="65" r="10" fill="none" stroke="#00ff41" strokeWidth="0.3" opacity="0.2" />
                    </svg>
                    {/* Location label */}
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/30">
                        28.6139° N, 77.2090° E
                    </div>

                    {/* Hovered handle display */}
                    {hoveredHandle && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-mono text-cyber-green animate-pulse">
                                {hoveredHandle}
                            </span>
                        </div>
                    )}
                </div>

                {/* Social buttons */}
                <div className="flex gap-3">
                    {SOCIALS.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full ice-card flex items-center justify-center text-white/60 hover:text-cyber-green hover:border-cyber-green transition-all duration-300"
                            onMouseEnter={() => setHoveredHandle(social.handle)}
                            onMouseLeave={() => setHoveredHandle(null)}
                            title={social.platform}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Location text */}
            <p className="text-xs font-mono text-white/30 mt-4 tracking-wider">
                📍 DELHI NCR, INDIA
            </p>
        </GlassCard>
    )
}
