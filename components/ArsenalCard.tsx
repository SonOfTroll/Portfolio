'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import GlassCard from './GlassCard'
import { SiLinux, SiAmazonwebservices } from 'react-icons/si'
import { FaPython } from 'react-icons/fa'

const TOOLS = [
    { name: 'Linux', icon: SiLinux },
    { name: 'Python', icon: PythonIcon },
    { name: 'Bash', icon: BashIcon },
    { name: 'AWS', icon: SiAmazonwebservices },
    { name: 'Git', icon: GitIcon },
    { name: 'Burp Suite', icon: BurpIcon },
    { name: 'Wireshark', icon: WiresharkIcon },
    { name: 'Metasploit', icon: MetasploitIcon },
]

export default function ArsenalCard() {
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!trackRef.current) return

        const track = trackRef.current
        const totalWidth = track.scrollWidth / 2

        gsap.to(track, {
            x: -totalWidth,
            duration: 25,
            ease: 'none',
            repeat: -1,
        })
    }, [])

    return (
        <GlassCard className="col-span-1 row-span-1 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs font-mono tracking-wider uppercase text-white/50">
                    THE ARSENAL
                </span>
            </div>

            {/* Marquee */}
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(10,10,10,0.8)] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(10,10,10,0.8)] to-transparent z-10" />

                <div ref={trackRef} className="marquee-track">
                    {/* Duplicate for seamless loop */}
                    {[...TOOLS, ...TOOLS].map((tool, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]">
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/60 hover:text-cyber-green transition-colors">
                                <tool.icon />
                            </div>
                            <span className="text-[9px] font-mono text-white/30 whitespace-nowrap">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    )
}

/* ═══════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════ */


function PythonIcon() {
    return (
        <svg viewBox="0 0 256 255" className="w-8 h-8" fill="currentColor">
            <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0111.13 11.13 11.12 11.12 0 01-11.13 11.13 11.12 11.12 0 01-11.13-11.13 11.12 11.12 0 0111.13-11.13z" />
            <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 01-11.13-11.13 11.12 11.12 0 0111.13-11.131 11.12 11.12 0 0111.13 11.13 11.12 11.12 0 01-11.13 11.13z" />
        </svg>
    )
}

function BashIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4zm0-2h16V8H4v10zm4-2h4v-1.5H8V16zm-2.5-3l3-3-3-3-.7.7L7.1 10l-2.3 2.3.7.7z" />
        </svg>
    )
}

function GitIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.885.719-2.604 0-.545-.545-.676-1.342-.4-2.01l-2.48-2.48v6.53c.175.087.34.202.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.544-.544-.676-1.343-.4-2.011L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
        </svg>
    )
}

function BurpIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" />
        </svg>
    )
}

function WiresharkIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    )
}

function MetasploitIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
    )
}
