'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import SelectedWorks from '@/components/SelectedWorks'
import ContactSection from '@/components/ContactSection'
import Preloader from '@/components/Preloader'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {
    const [sceneReady, setSceneReady] = useState(false)
    const [booting, setBooting] = useState(true)

    return (
        <>
            {booting && <Preloader ready={sceneReady} onDone={() => setBooting(false)} />}

            <main className="noise-overlay">
                {/* 3D Background — fixed behind everything */}
                <div className="canvas-container">
                    <Scene activeProject={null} onReady={() => setSceneReady(true)} />
                </div>

            {/* Scrollable Content Overlay */}
            <div className="content-overlay">
                {/* Page 0: Hero */}
                <section className="scroll-section">
                    <div className="scroll-section-content">
                        <Hero start={!booting} />
                    </div>
                </section>

                {/* Page 1: Bento Grid (Music + LeetCode + AWS + Arsenal + CTF + Comms) */}
                <section className="scroll-section" style={{ alignItems: 'flex-start', paddingTop: '5vh' }}>
                    <div className="scroll-section-content">
                        <BentoGrid />
                    </div>
                </section>

                {/* Page 2: Selected Works */}
                <section className="scroll-section" style={{ alignItems: 'flex-start', paddingTop: '10vh' }}>
                    <div className="scroll-section-content">
                        <SelectedWorks />
                    </div>
                </section>

                {/* Page 3: Contact */}
                <section className="scroll-section">
                    <div className="scroll-section-content">
                        <ContactSection />
                    </div>
                </section>
                </div>
            </main>
        </>
    )
}
