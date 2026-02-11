'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArsenalCard from './ArsenalCard'
import CommsCard from './CommsCard'

gsap.registerPlugin(ScrollTrigger)

export default function ArsenalSection() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const cards = sectionRef.current.querySelectorAll('.arsenal-item')

        gsap.fromTo(
            cards,
            { opacity: 0, x: 80, scale: 0.95 },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    }, [])

    return (
        <div ref={sectionRef}>
            {/* Section label */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">
                    TOOLKIT &amp; LOCALE
                </span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Cards — positioned RIGHT to align with crystal moving LEFT */}
            <div className="max-w-2xl ml-auto space-y-5">
                <div className="arsenal-item">
                    <ArsenalCard />
                </div>
                <div className="arsenal-item">
                    <CommsCard />
                </div>
            </div>
        </div>
    )
}
