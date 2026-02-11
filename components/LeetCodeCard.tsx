'use client'

import { useEffect, useState } from 'react'
import GlassCard from './GlassCard'

interface LeetCodeStats {
    username: string
    totalSolved: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    ranking: number
}

function RadialProgress({ value, max, label }: { value: number; max: number; label: string }) {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const progress = max > 0 ? (value / max) * circumference : 0
    const offset = circumference - progress

    return (
        <div className="relative w-32 h-32 md:w-36 md:h-36">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="4"
                />
                {/* Progress circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#00ff41"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        filter: 'drop-shadow(0 0 8px rgba(0, 255, 65, 0.4))',
                    }}
                />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-white">{value}</span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{label}</span>
            </div>
        </div>
    )
}

export default function LeetCodeCard() {
    const [stats, setStats] = useState<LeetCodeStats | null>(null)

    useEffect(() => {
        fetch('/api/leetcode')
            .then((r) => r.json())
            .then(setStats)
            .catch(() => null)
    }, [])

    return (
        <GlassCard className="col-span-1 row-span-1 flex flex-col items-center justify-center text-center">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 w-full">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs font-mono tracking-wider uppercase text-white/50">
                    INTELLIGENCE
                </span>
            </div>

            {stats ? (
                <>
                    <RadialProgress value={stats.totalSolved} max={3500} label="Solved" />

                    <p className="mt-4 text-xs font-mono text-cyber-green tracking-wider">
                        ALGORITHMIC RANK: #{stats.ranking?.toLocaleString() || '—'}
                    </p>

                    {/* Difficulty breakdown */}
                    <div className="flex gap-4 mt-3 text-[10px] font-mono text-white/40">
                        <span>
                            <span className="text-green-400">{stats.easySolved}</span> EASY
                        </span>
                        <span>
                            <span className="text-yellow-400">{stats.mediumSolved}</span> MED
                        </span>
                        <span>
                            <span className="text-red-400">{stats.hardSolved}</span> HARD
                        </span>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-32">
                    <span className="text-sm font-mono text-white/30 animate-pulse">DECRYPTING...</span>
                </div>
            )}
        </GlassCard>
    )
}
