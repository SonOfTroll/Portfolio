'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'
const NAME = 'KISHAN PANDEY'

export default function Hero({ start = true }: { start?: boolean }) {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtextRef = useRef<HTMLParagraphElement>(null)
    const tiltRef = useRef<HTMLDivElement>(null)

    // ═══ 3D Holographic Tilt ═══
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!tiltRef.current) return

            const x = (e.clientX / window.innerWidth) - 0.5
            const y = (e.clientY / window.innerHeight) - 0.5

            gsap.to(tiltRef.current, {
                transform: `
                    perspective(1000px) 
                    rotateY(${x * 30}deg) 
                    rotateX(${-y * 30}deg) 
                    scale3d(1.03, 1.03, 1.03)
                `,
                duration: 1.5,
                ease: 'power2.out',
                overwrite: 'auto'
            })
        }

        window.addEventListener('mousemove', handleGlobalMouseMove)
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
    }, [])

    // Scramble the name immediately so it reads as "encrypted" behind the preloader
    useEffect(() => {
        if (!titleRef.current) return
        const chars = titleRef.current.querySelectorAll('.hero-char')
        chars.forEach((char) => {
            if ((char as HTMLElement).dataset.final !== ' ') {
                char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
            }
        })
    }, [])

    // Decrypt runs only once the preloader hands over (start === true)
    useEffect(() => {
        if (!start || !titleRef.current) return

        const chars = titleRef.current.querySelectorAll('.hero-char')
        const nameChars = NAME.split('')

        // Track every timer so we can clean up on unmount
        const intervals: ReturnType<typeof setInterval>[] = []
        const timeouts: ReturnType<typeof setTimeout>[] = []

        // Re-scramble, then decrypt — each char resolves with a staggered start delay
        chars.forEach((char, i) => {
            const finalChar = nameChars[i]
            if (finalChar === ' ') return

            const delay = i * 80 // ms — left-to-right stagger
            const maxIterations = 8 + Math.floor(Math.random() * 6)

            const startTimeout = setTimeout(() => {
                let iterations = 0
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
                intervals.push(interval)
            }, delay)
            timeouts.push(startTimeout)
        })

        // Subtext fade in
        gsap.fromTo(
            subtextRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, delay: 1.5, ease: 'power3.out' }
        )

        return () => {
            intervals.forEach(clearInterval)
            timeouts.forEach(clearTimeout)
        }
    }, [start])

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
            {/* 3D Tilt Container */}
            <div
                ref={tiltRef}
                style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
            >
                {/* Massive Typography — NO WRAPPING */}
                <h1
                    ref={titleRef}
                    className="text-[clamp(3rem,10vw,15rem)] whitespace-nowrap leading-none font-black font-sans mix-blend-overlay select-none text-center"
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
                className="mt-8 text-sm md:text-base tracking-[0.3em] uppercase opacity-0 font-mono"
                style={{ color: 'rgba(255,255,255,0.5)' }}
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
