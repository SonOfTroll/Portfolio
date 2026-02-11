'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

interface GlassCardProps {
    children: ReactNode
    className?: string
    hover?: boolean
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
    return (
        <div
            className={clsx(
                'ice-card p-6 md:p-8 overflow-hidden relative',
                !hover && 'pointer-events-none',
                className
            )}
        >
            {children}
        </div>
    )
}
