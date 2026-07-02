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
    highlights: string[]
    stack: string[]
    github: string
}

const PROJECTS: Project[] = [
    {
        name: 'ZTForge',
        status: 'MAR–MAY 2026 // ZERO TRUST',
        statusColor: '#00ff41',
        statusPulse: true,
        desc: 'Full-stack platform to visually model Zero Trust architectures and run deterministic breach simulations mapped to MITRE ATT&CK (stolen credentials T1078, insider threat T1136, privilege escalation T1068). Enforces NIST 800-207 policies across graph edges with RS256 JWT validation against Keycloak JWKS, OPA default-deny evaluation, RBAC, and per-user Redis rate limiting. A graph-traversal engine models MFA, device compliance, and micro-segmentation to score risk and export policy artifacts (OPA Rego, Terraform, iptables).',
        highlights: [
            'Blocked 100% of simulated lateral movement across 15+ scenarios',
            'Cut manual policy review time ~60% in internal benchmarks',
            'Reduced policy misconfiguration surface ~40% vs. allow-all baseline',
        ],
        stack: ['Python', 'FastAPI', 'React', 'Keycloak (OIDC)', 'OPA', 'PostgreSQL', 'Redis', 'Docker'],
        github: 'https://github.com/SonOfTroll',
    },
    {
        name: 'CloudForge-Auditor',
        status: 'APR–MAY 2026 // CLOUD SEC',
        statusColor: '#00ff41',
        statusPulse: false,
        desc: 'Read-only AWS security & compliance auditor mapping 30+ CIS Benchmark controls across IAM, S3, EC2, and CloudTrail. Detects 8 critical misconfiguration categories — missing MFA on root, public S3 buckets, unrestricted 0.0.0.0/0 security groups, stale IAM keys (>90 days), disabled CloudTrail logging — with a zero-false-positive design, and generates prioritised CSV/HTML remediation reports.',
        highlights: [
            'Scans a typical 3-service AWS account in under 90 seconds',
            'Surfaced 12 critical findings on a test environment in the first run',
            'Zero-false-positive detection philosophy',
        ],
        stack: ['Python', 'Boto3', 'AWS IAM/S3/EC2', 'CloudTrail', 'CIS Benchmarks'],
        github: 'https://github.com/SonOfTroll',
    },
    {
        name: 'ShadowProbe',
        status: 'FEB–MAR 2026 // OFFENSIVE',
        statusColor: '#00ff41',
        statusPulse: false,
        desc: 'Modular network reconnaissance & vulnerability scanning framework with ICMP/ARP host discovery and TCP-connect, SYN half-open (stealth), and UDP port scanning against Linux targets. Adds service fingerprinting via banner grabbing (25+ protocol signatures) and a local CVE/CVSS signature database, outputting structured JSON and HTML reports with severity ratings.',
        highlights: [
            'Scans a /24 subnet in under 45 seconds vs. 3+ min sequential',
            '25+ protocol signatures for service fingerprinting',
            'Reduced manual triage time ~50% vs. raw Nmap output',
        ],
        stack: ['Python', 'Scapy', 'Sockets', 'TCP/IP', 'DNS', 'Nmap', 'Kali Linux'],
        github: 'https://github.com/SonOfTroll',
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
                        <p className="mt-3 text-sm text-white/40 max-w-3xl font-mono leading-relaxed">
                            {project.desc}
                        </p>

                        {/* Key metrics */}
                        <ul className="mt-4 flex flex-col gap-1.5 max-w-3xl">
                            {project.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2 text-xs font-mono text-white/55">
                                    <span className="text-cyber-green mt-[1px]">▹</span>
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Source link */}
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-white/40 hover:text-cyber-green transition-colors"
                        >
                            <span>View Source</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
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
