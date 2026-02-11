'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import SelectedWorks from '@/components/SelectedWorks'
import ContactSection from '@/components/ContactSection'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function Home() {

    return (
        <main className="noise-overlay">
            {/* 3D Background — fixed behind everything */}
            <div className="canvas-container">
                <Scene activeProject={null} />
            </div>

            {/* Scrollable Content Overlay */}
            <div className="content-overlay">
                {/* Page 0: Hero */}
                <section className="scroll-section">
                    <div className="scroll-section-content">
                        <Hero />
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
    )
}
