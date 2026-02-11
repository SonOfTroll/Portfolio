'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'
const NAME = 'KISHAN PANDEY'

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtextRef = useRef<HTMLParagraphElement>(null)
    const tiltRef = useRef<HTMLDivElement>(null)

    // ═══ 3D Holographic Tilt ═══
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!tiltRef.current) return
        const rect = tiltRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        tiltRef.current.style.transform = `
            perspective(1000px)
            rotateY(${x * 20}deg)
            rotateX(${-y * 20}deg)
            scale3d(1.03, 1.03, 1.03)
        `
    }, [])

    const handleMouseLeave = useCallback(() => {
        if (!tiltRef.current) return
        tiltRef.current.style.transform = `
            perspective(1000px)
            rotateY(0deg)
            rotateX(0deg)
            scale3d(1, 1, 1)
        `
    }, [])

    useEffect(() => {
        if (!titleRef.current) return

        const chars = titleRef.current.querySelectorAll('.hero-char')
        const nameChars = NAME.split('')

        // Set initial random chars
        chars.forEach((char) => {
            if ((char as HTMLElement).dataset.final !== ' ') {
                char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
            }
        })

        // Decrypt animation — each char resolves with staggered delay
        chars.forEach((char, i) => {
            const finalChar = nameChars[i]
            if (finalChar === ' ') return

            const delay = i * 0.08
            let iterations = 0
            const maxIterations = 8 + Math.floor(Math.random() * 6)

            const interval = setInterval(() => {
                if (iterations >= maxIterations) {
                    char.textContent = finalChar
                    clearInterval(interval)
                    // Green flash on lock-in
                    gsap.fromTo(char, { color: '#00ff41' }, { color: 'rgba(255,255,255,0.95)', duration: 0.6 })
                    return
                }
                char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
                iterations++
            }, 50)

            // Delay start
            setTimeout(() => { }, delay * 1000)
        })

        // Subtext fade in
        gsap.fromTo(
            subtextRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, delay: 1.5, ease: 'power3.out' }
        )
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
            {/* 3D Tilt Container */}
            <div
                ref={tiltRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transition: 'transform 0.15s ease-out',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
            >
                {/* Massive Typography — NO WRAPPING */}
                <h1
                    ref={titleRef}
                    className="text-[clamp(3rem,10vw,15rem)] whitespace-nowrap leading-none font-black mix-blend-overlay select-none text-center"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    {NAME.split('').map((char, i) => (
                        <span
                            key={i}
                            className="hero-char inline-block"
                            data-final={char}
                            style={{
                                color: char === ' ' ? 'transparent' : 'rgba(255,255,255,0.95)',
                                width: char === ' ' ? '0.3em' : 'auto',
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>
            </div>

            {/* Subtext */}
            <p
                ref={subtextRef}
                className="mt-8 text-sm md:text-base tracking-[0.3em] uppercase opacity-0"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.5)' }}
            >
                Defensive Security <span className="text-cyber-green mx-2">{'// '}</span>Linux Systems{' '}
                <span className="text-cyber-green mx-2">{'// '}</span>CTF Player
            </p>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
                <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
        </div>
    )
}
