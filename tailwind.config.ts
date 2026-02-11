import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'cyber-green': '#00ff41',
                'cyber-green-dim': 'rgba(0, 255, 65, 0.15)',
                'ice-white': 'rgba(255, 255, 255, 0.9)',
                'void': '#0a0a0a',
                'void-light': '#111111',
            },
            fontFamily: {
                sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backdropBlur: {
                '3xl': '64px',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 8s linear infinite',
                'waveform': 'waveform 1.2s ease-in-out infinite',
            },
            keyframes: {
                waveform: {
                    '0%, 100%': { height: '4px' },
                    '50%': { height: '24px' },
                },
            },
        },
    },
    plugins: [],
}
export default config
