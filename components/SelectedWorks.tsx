'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
    name: string
    status: string
    statusColor: string
    statusPulse: boolean
    desc: string
    stack: string[]
}

const PROJECTS: Project[] = [
    {
        name: 'SENTR1X',
        status: 'ONGOING // CLASSIFIED',
        statusColor: '#facc15',
        statusPulse: true,
        desc: 'SentriX is a modular host-based security monitoring system for Linux that continuously observes system activity, detects suspicious behavior, and triggers automated response actions. The system monitors SSH authentication logs, critical file integrity, and privileged process behavior, converting raw system signals into structured security events.',
        stack: ['Python', 'Linux Logs', 'iptables', 'psutil', 'Git'],
    },
    {
        name: 'Network Reconnaissance Tool',
        status: 'v1.0 // OFFENSIVE',
        statusColor: '#00ff41',
        statusPulse: false,
        desc: 'A Python-based network reconnaissance tool designed to identify exposed services and assess potential attack surfaces. The system performs port scanning and service enumeration using socket-based probing and fingerprinting techniques, converting raw network responses into structured scan results.',
        stack: ['Python', 'Raw Sockets', 'Network Protocols'],
    },
]

export default function SelectedWorks() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        if (!sectionRef.current) return

        const rows = sectionRef.current.querySelectorAll('.project-row')

        gsap.fromTo(
            rows,
            { opacity: 0, x: -40 },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    }, [])

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }

    return (
        <section
            ref={sectionRef}
            className="px-6 md:px-12 lg:px-20 py-20 max-w-7xl mx-auto"
            onMouseMove={handleMouseMove}
        >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">
                    SELECTED WORKS
                </span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Project list */}
            <div className="space-y-0">
                {PROJECTS.map((project, i) => (
                    <div
                        key={project.name}
                        className="project-row group border-t border-white/10 py-8 md:py-10 cursor-default relative"
                        onMouseEnter={() => setHoveredProject(i)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                            {/* Project name */}
                            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white/90 group-hover:text-cyber-green transition-colors duration-300 flex-shrink-0">
                                {project.name}
                            </h3>

                            {/* Status badge */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <div
                                    className={`w-2 h-2 rounded-full ${project.statusPulse ? 'status-pulse' : ''}`}
                                    style={{ backgroundColor: project.statusColor }}
                                />
                                <span className="text-[10px] font-mono tracking-wider text-white/40">
                                    [ {project.status} ]
                                </span>
                            </div>

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* Stack tags */}
                            <div className="flex gap-2 flex-shrink-0">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-white/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mt-3 text-sm text-white/40 max-w-2xl font-mono leading-relaxed">
                            {project.desc}
                        </p>
                    </div>
                ))}
                {/* Bottom border */}
                <div className="border-t border-white/10" />
            </div>

            {/* Glitch image follower */}
            {hoveredProject !== null && (
                <div
                    className="fixed pointer-events-none z-50 w-48 h-32 overflow-hidden rounded-lg"
                    style={{
                        left: mousePos.x + 20,
                        top: mousePos.y - 60,
                        transform: 'translate(0, 0)',
                    }}
                >
                    <div
                        className="w-full h-full flex items-center justify-center text-cyber-green font-mono text-xs"
                        style={{
                            background: 'rgba(0, 255, 65, 0.05)',
                            border: '1px solid rgba(0, 255, 65, 0.2)',
                            backdropFilter: 'blur(10px)',
                            animation: 'glitch 0.3s infinite',
                        }}
                    >
                        <div className="text-center">
                            <div className="text-lg font-bold mb-1" style={{
                                textShadow: '2px 0 #ff0000, -2px 0 #0000ff',
                                animation: 'glitch-text 0.5s infinite',
                            }}>
                                {PROJECTS[hoveredProject].name}
                            </div>
                            <div className="text-[10px] text-white/30">
                                {PROJECTS[hoveredProject].stack.join(' · ')}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, -2px); }
          80% { transform: translate(1px, 1px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-text {
          0% { text-shadow: 2px 0 #ff0000, -2px 0 #0000ff; }
          25% { text-shadow: -2px 0 #ff0000, 2px 0 #0000ff; }
          50% { text-shadow: 2px 2px #ff0000, -2px -2px #0000ff; }
          75% { text-shadow: -1px 1px #ff0000, 1px -1px #0000ff; }
          100% { text-shadow: 2px 0 #ff0000, -2px 0 #0000ff; }
        }
      `}</style>
        </section>
    )
}
