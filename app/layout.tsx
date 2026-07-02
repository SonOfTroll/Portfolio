import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://portfolio-five-lilac-42.vercel.app'),
    title: 'Kishan Pandey',
    description: 'Security // Linux Systems // CTF Player. Portfolio of Kishan Pandey, a cybersecurity student from Delhi-NCR, India.',
    keywords: ['cybersecurity', 'CTF', 'Linux', 'portfolio', 'Kishan Pandey', 'security'],
    authors: [{ name: 'Kishan Pandey' }],
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Kishan Pandey',
        description: 'Defensive Security // Linux Systems // CTF Player',
        type: 'website',
        locale: 'en_US',
        siteName: 'Kishan Pandey',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kishan Pandey',
        description: 'Defensive Security // Linux Systems // CTF Player',
    },
}

export default function RootLayout({
    children,
}: {
    
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}
