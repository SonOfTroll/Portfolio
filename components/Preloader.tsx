'use client'

import { useEffect, useRef, useState } from 'react'

// Boot log — surfaced as progress climbs. Kept terse and in the site's voice.
const STATUS = [
    { at: 0, text: 'booting cryo-core' },
    { at: 24, text: 'compiling shaders' },
    { at: 48, text: 'warming render pipeline' },
    { at: 72, text: 'calibrating ice lattice' },
    { at: 96, text: 'core online' },
]

export default function Preloader({ ready, onDone }: { ready: boolean; onDone: () => void }) {
    const [progress, setProgress] = useState(0)
    const [exiting, setExiting] = useState(false)
    const readyRef = useRef(ready)
    const doneRef = useRef(false)

    useEffect(() => {
        readyRef.current = ready
    }, [ready])

    useEffect(() => {
        // Hold the page still while the core boots.
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const MIN_MS = reduced ? 500 : 2200 // let the sphere breathe before reveal
        const MAX_MS = 7000 // hard ceiling — never hang, even if WebGL never signals
        const start = performance.now()
        let raf = 0

        const tick = () => {
            const elapsed = performance.now() - start
            const armed = readyRef.current || elapsed > MAX_MS
            // Creep toward 90% while waiting; only allow 100% once ready AND min time passed.
            const cap = armed && elapsed > MIN_MS ? 100 : armed ? 97 : 90

            setProgress((prev) => {
                const next = Math.min(cap, prev + (cap - prev) * 0.06 + 0.4)
                if (next >= 99.9 && !doneRef.current) {
                    doneRef.current = true
                    setExiting(true)
                    window.setTimeout(onDone, reduced ? 350 : 850)
                }
                return next
            })

            if (!doneRef.current) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            document.body.style.overflow = prevOverflow
        }
    }, [onDone])

    const status = [...STATUS].reverse().find((s) => progress >= s.at) ?? STATUS[0]
    const pct = Math.min(100, Math.floor(progress))

    return (
        <div
            className={`preloader${exiting ? ' preloader--exit' : ''}`}
            role="status"
            aria-live="polite"
            aria-label={`Loading, ${pct} percent`}
        >
            <div className="preloader__glow" aria-hidden="true" />

            <div className="preloader__inner">
                {/* Vector twin of the 3D core — draws itself, then hands off to WebGL */}
                <svg className="preloader__core" viewBox="0 0 100 100" aria-hidden="true">
                    <g className="preloader__spin">
                        <path className="pc pc1" pathLength={1} d="M50 10 L84.64 30 L84.64 70 L50 90 L15.36 70 L15.36 30 Z" />
                        <path className="pc pc2" pathLength={1} d="M50 10 L84.64 70 L15.36 70 Z" />
                        <path className="pc pc3" pathLength={1} d="M84.64 30 L50 90 L15.36 30 Z" />
                        <path className="pc pc4" pathLength={1} d="M50 32 L65.59 41 L65.59 59 L50 68 L34.41 59 L34.41 41 Z" />
                    </g>
                </svg>

                <div className="preloader__eyebrow">DIGITAL TUNDRA</div>

                <div className="preloader__bar">
                    <span style={{ width: `${pct}%` }} />
                </div>

                <div className="preloader__meta">
                    <span className="preloader__status">
                        &gt; {status.text}
                        <i className="preloader__cursor">_</i>
                    </span>
                    <span className="preloader__pct">{String(pct).padStart(3, '0')}%</span>
                </div>
            </div>
        </div>
    )
}
