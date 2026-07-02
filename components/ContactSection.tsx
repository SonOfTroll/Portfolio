'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type FormState = 'idle' | 'loading' | 'verified' | 'unknown' | 'sent' | 'error'

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [formState, setFormState] = useState<FormState>('idle')
    const [responseText, setResponseText] = useState('')

    useEffect(() => {
        if (!sectionRef.current) return
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    }, [])

    const handleSubmit = async () => {
        if (!name.trim()) return
        setFormState('loading')
        setResponseText('Querying database...')

        try {
            const res = await fetch('/api/identify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim() }),
            })
            const data = await res.json()

            if (data.known) {
                // Recognized visitor — greet them and skip the message step.
                setFormState('verified')
                setResponseText(
                    data.greeting || `Access granted. Welcome back, ${data.displayName || name}.`
                )
            } else {
                setFormState('unknown')
                setResponseText(`Unknown Entity detected: "${name}". Protocol: Leave a Message.`)
            }
        } catch {
            // Lookup failed — fall back to the leave-a-message flow.
            setFormState('unknown')
            setResponseText(`Unknown Entity detected: "${name}". Protocol: Leave a Message.`)
        }
    }

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        setFormState('loading');
        setResponseText('Encrypting transmission...');

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 sec timeout

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender: name, message }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                let errorMsg = `HTTP ${res.status}`;
                try {
                    const errData = await res.json();
                    errorMsg = errData.error || errData.message || errorMsg;
                } catch { }
                throw new Error(errorMsg);
            }

            const data = await res.json();

            if (data.success) {
                setFormState('sent');
                setResponseText('>> Transmission received. Over and out.');
            } else {
                setFormState('error');
                setResponseText(`>> Transmission failed: ${data.error || 'Server rejected'}`);
            }
        } catch (err) {
            setFormState('error');

            let userMsg = 'Network error';
            if (err instanceof Error) {
                if (err.name === 'AbortError') {
                    userMsg = 'Request timed out (slow net?)';
                } else if (err.message?.includes('Failed to fetch')) {
                    userMsg = 'Cannot reach server – check if site is live';
                } else {
                    userMsg = err.message || 'Transmission failed';
                }
            }

            setResponseText(`>> ${userMsg}`);
        }
    };

    const getPromptPrefix = () => 'root@kishan:~/contact#'

    return (
        <section ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-20 max-w-4xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">ESTABLISH HANDSHAKE</span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Terminal Window */}
            <div className="ice-card overflow-hidden">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs font-mono text-white/30 ml-3">&gt;_ contact_terminal</span>
                </div>

                {/* Terminal Body */}
                <div className="p-5 md:p-8 font-mono text-sm space-y-4">
                    {/* Boot text */}
                    <div className="text-white/20 text-xs space-y-1">
                        <p>Initializing contact protocol...</p>
                        <p>Encryption: AES-256-GCM</p>
                        <p>Status: <span className="text-cyber-green">READY</span></p>
                        <p>---</p>
                    </div>

                    {/* Name Input */}
                    <div className="flex items-center gap-2">
                        <span className="text-cyber-green text-xs whitespace-nowrap">{getPromptPrefix()}</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && formState === 'idle') handleSubmit() }}
                            placeholder="Enter your identity..."
                            disabled={formState !== 'idle'}
                            className="flex-1 bg-transparent border-none outline-none text-white/80 placeholder:text-white/20 text-sm font-mono"
                        />
                        {formState === 'idle' && (
                            <button onClick={handleSubmit} className="text-xs text-cyber-green border border-cyber-green/30 px-3 py-1 rounded hover:bg-cyber-green/10 transition-colors">EXEC</button>
                        )}
                    </div>

                    {/* Response */}
                    {responseText && (
                        <div className={`text-xs leading-relaxed ${formState === 'sent' || formState === 'verified' ? 'text-cyber-green' : formState === 'unknown' ? 'text-yellow-400' : formState === 'error' ? 'text-red-400' : 'text-white/40'}`}>
                            <p>&gt;&gt; {responseText}</p>
                        </div>
                    )}

                    {/* Message input */}
                    {formState === 'unknown' && (
                        <div className="pt-2 space-y-3">
                            <div className="flex items-start gap-2">
                                <span className="text-cyber-green text-xs whitespace-nowrap mt-1">{getPromptPrefix()}</span>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    rows={3}
                                    className="flex-1 bg-transparent border border-white/10 rounded-lg p-3 outline-none text-white/80 placeholder:text-white/20 text-sm font-mono resize-none focus:border-cyber-green/30 transition-colors"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleSendMessage} className="text-xs text-cyber-green border border-cyber-green/30 px-4 py-1.5 rounded hover:bg-cyber-green/10 transition-colors">TRANSMIT</button>
                            </div>
                        </div>
                    )}

                    {/* Recognized visitor — only the custom greeting is shown (above) */}
                    {formState === 'verified' && (
                        <div className="pt-1 text-xs">
                            <p className="terminal-cursor text-white/20">_</p>
                        </div>
                    )}

                    {/* Sent confirmation */}
                    {formState === 'sent' && (
                        <div className="text-xs text-white/20 pt-2">
                            <p>Connection closed.</p>
                            <p className="terminal-cursor">_</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center">
                <p className="text-xs font-mono text-white/20 tracking-wider">© {new Date().getFullYear()} KISHAN PANDEY — ALL SYSTEMS OPERATIONAL</p>
                <p className="text-[10px] font-mono text-white/10 mt-2">28.6139° N · DELHI NCR · INDIA</p>
            </div>
        </section>
    )
}