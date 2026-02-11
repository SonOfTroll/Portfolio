'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiAmazonwebservices, SiKalilinux } from 'react-icons/si'
import GlassCard from './GlassCard'
import MusicCard from './MusicCard'
import LeetCodeCard from './LeetCodeCard'
import ArsenalCard from './ArsenalCard'
import CommsCard from './CommsCard'

gsap.registerPlugin(ScrollTrigger)

export default function BentoGrid() {
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!gridRef.current) return

        const cards = gridRef.current.querySelectorAll('.bento-item')

        gsap.fromTo(
            cards,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    }, [])

    return (
        <section className="px-6 md:px-12 lg:px-20 py-20 max-w-7xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">
                    SYSTEM OVERVIEW
                </span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* ═══ ROW 1: Vibe Check — Full Width ═══ */}
                <div className="bento-item md:col-span-2">
                    <MusicCard />
                </div>

                {/* ═══ ROW 2 LEFT: LeetCode Intelligence ═══ */}
                <div className="bento-item">
                    <LeetCodeCard />
                </div>

                {/* ═══ ROW 2 RIGHT: AWS Certified Cloud Practitioner ═══ */}
                <div className="bento-item">
                    <GlassCard className="h-full p-6 flex flex-col justify-center items-center gap-4">
                        {/* Glowing AWS Logo */}
                        <div className="relative w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_#FF990050]">
                            <SiAmazonwebservices className="w-8 h-8 text-[#FF9900]" />
                        </div>

                        {/* Title */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold leading-none">AWS CERTIFIED</h3>
                            <p className="text-xs text-white/60 tracking-widest mt-1">CLOUD PRACTITIONER</p>
                        </div>

                        {/* Validation Link */}
                        <a
                            href="https://cp.certmetrics.com/amazon/en/public/verify/credential/4aba3b8d5123497cb205d58ca0330a5e"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 rounded-full border border-[#FF9900]/30 text-[#FF9900] text-[10px] font-mono tracking-wider hover:bg-[#FF9900] hover:text-black transition-all duration-300"
                        >
                            VERIFY CREDENTIAL
                        </a>
                    </GlassCard>
                </div>

                {/* ═══ ROW 3: The Arsenal — Full Width ═══ */}
                <div className="bento-item md:col-span-2">
                    <ArsenalCard />
                </div>

                {/* ═══ ROW 4 LEFT: ByteHunters CTF Team ═══ */}
                <div className="bento-item">
                    <GlassCard className="h-full p-6 flex flex-col justify-between group overflow-hidden relative">
                        {/* Radar Background Animation */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,255,65,0.2)_100%)] animate-pulse" />
                            <div className="w-full h-[1px] bg-[#00ff41]/30 absolute top-1/2 left-0 animate-[scan_2s_linear_infinite]" />
                        </div>

                        <div className="relative z-10 flex justify-between items-start">
                            <div className="p-2 bg-white/5 rounded border border-white/10">
                                <SiKalilinux className="w-6 h-6 text-[#00ff41]" />
                            </div>
                            <div className="text-[10px] font-mono text-[#00ff41] bg-[#00ff41]/10 px-2 py-1 rounded">
                                STATUS: ACTIVE
                            </div>
                        </div>

                        <div className="relative z-10 mt-4">
                            <h3 className="text-xl font-bold text-white">BYTEHUNTERS</h3>
                            <p className="text-xs text-white/50">CTF OPERATIONS UNIT</p>
                        </div>

                        <a
                            href="https://ctftime.org/team/92229"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 mt-4 flex items-center gap-2 text-xs font-bold text-[#00ff41] hover:text-white transition-colors"
                        >
                            <span>VIEW TEAM PROFILE</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </GlassCard>
                </div>

                {/* ═══ ROW 4 RIGHT: Comms & Base ═══ */}
                <div className="bento-item">
                    <CommsCard />
                </div>
            </div>

            {/* Scan keyframe for ByteHunters radar */}
            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
            `}</style>
        </section>
    )
}
